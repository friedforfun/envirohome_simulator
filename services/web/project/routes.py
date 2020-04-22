## @package routes.py
#
# \brief
# \details
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \copyright MIT License.
#

# from flask import Flask, jsonify
from project import app, db
from flask import jsonify, request
from sqlalchemy import or_, and_, func
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow import ValidationError
from functools import wraps
import project.models as models
import project.serialisers as serialisers
from project.serialisers import get_device_model
from project.tasks import post_to_stream
import uuid
import jwt
import datetime


class APIError(Exception):
    error_code = 400

    def __init__(self, detail, status_code=None):
        Exception.__init__(self)
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code

    def to_dict(self):
        err_msg = {
            "status_code": self.status_code,
            "detail": self.detail
        }
        return {"error": err_msg}


@app.errorhandler(APIError)
def handle_api_error(err):
    res = jsonify(err.to_dict())
    res.status_code = err.status_code
    return res


def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            raise APIError('token missing', status_code=401)

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = models.User.query.filter_by(public_id=data['public_id']).first()
        except:
            raise APIError('token invalid', status_code=401)

        return func(*args, **kwargs)
    return wrapper


@app.route("/auth/login", methods=["POST"])
def login():
    user_data = request.get_json()
    try:
        serialisers.LoginSchema().load(user_data)
    except ValidationError as err:
        raise APIError(err.messages, status_code=400)

    user = models.User.query.filter_by(email=user_data['email']).first()
    if not user:
        raise APIError('incorrect username or password', status_code=401)

    if check_password_hash(user.password_hash, user_data['password']):
        token = jwt.encode({
            'public_id': user.public_id,
            'admin': user.is_admin,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        return jsonify({"token": token.decode('UTF-8'),
                        'email': user.email,
                        'user_id': user.public_id})
    else:
        raise APIError('incorrect username or password', status_code=401)


@app.route("/auth/register", methods=["POST"])
def new_user():
    user_data = request.get_json()
    try:
        serialisers.UserSchema().load(user_data)
    except ValidationError as err:
        raise APIError(err.messages, status_code=400)

    duplicate = models.User.query.filter(or_(user_data['email'] == models.User.email,
                                             user_data['username'] == models.User.username)).first()
    if duplicate:
        raise APIError('email or username taken', status_code=409)

    hashed_password = generate_password_hash(user_data['password'],
                                             method="pbkdf2:sha256:8000")

    user = models.User(public_id=uuid.uuid4(), username=user_data['username'],
                       email=user_data['email'], password_hash=hashed_password)

    db.session.add(user)
    db.session.commit()
    return jsonify({"user_id": "{}".format(user.public_id)})


################# USER ROUTES ################################################


@app.route("/user/<public_id>", methods=["GET"])
def get_user(public_id):
    user = models.User.query.filter_by(public_id=public_id).first()
    if not user:
        raise APIError(detail="user {} does not exist".format(public_id),
                       status_code=404)
    return models.User.get_delete_put_post(prop_filters={'public_id':
                                           public_id})


@app.route("/user", methods=["GET"])
def get_all_users():
    users = models.User.query.all()
    user_list = [{
            'id': user.id,
            'public_id': user.public_id,
            'username': user.username,
            'email': user.email,
            'password_hash': user.password_hash,
            'active': user.active,
            'admin': user.is_admin
        } for user in users]
    return jsonify(user_list)


@app.route("/user/<public_id>", methods=["DELETE"])
def delete_user():
    pass


################# DEVICE ROUTES ################################################


@app.route("/api/device", methods=["GET"])
## \brief get_devices()
# instatiates a session to the database and parses everything in the devices table
# formats it into JSON
# Returns all devices in JSON format
def get_devices():
    devices = db.session.query(models.Devices).all()
    device_model = serialisers.DeviceSchema(many=True)
    return jsonify({'devices': device_model.dump(devices)})

## \brief get_device()
#
#
@app.route("/api/device/<int:d_id>", methods=["GET"])
def get_device(d_id):
    device = db.session.query(models.Devices).filter_by(device_id=d_id).first()
    device_model = get_device_model(device.type)
    return jsonify(device_model().dump(device))


@app.route("/api/device/<device_pk>/toggle_power", methods=["GET"])
@token_required
def toggle_power(device_pk):
    device = db.session.query(models.Devices).filter_by(device_id=device_pk).first()
    power_state = device.is_on
    device.is_on = not power_state
    db.session.commit()
    return jsonify({'success': 'device ID: {} power is now {}'.format(device_pk, not power_state)})


@app.route("/api/device/<string:device_type>", methods=["POST"])
def add_device(device_type):
    if device_type not in ['tv', 'plug', 'light', 'thermostat', 'solar']:
        raise APIError('no such device type', status_code=400)

    device_data = request.get_json()
    serialiser = get_device_model(device_type)
    try:
        serialiser().load(device_data)
    except ValidationError as err:
        raise APIError(err.messages, status_code=400)

    duplicate = db.session.query(models.Devices).filter_by(device_name=device_data['device_name']).first()

    if duplicate:
        raise APIError('device with name {} already\
                exists'.format(device_data['device_name']), status_code=409)

    model = get_device_table_name(device_type)
    db.session.add(model(**device_data))
    db.session.commit()
    device = db.session.query(models.Devices).filter_by(device_name=device_data['device_name']).first()
    post_to_stream('device_{}_second'.format(device.device_id), 0)
    post_to_stream('device_{}_minute'.format(device.device_id), 0)
    post_to_stream('device_{}_hour'.format(device.device_id), 0)
    return jsonify({'success': 'device {} has been added'.format(device_data['device_name'])}), 201


@app.route("/api/device/<int:device_id>", methods=["PUT"])
def change_device(device_id):
    device = db.session.query(models.Devices).filter_by(device_id=device_id).first()
    if device is None:
        raise APIError('device does not exist', status_code=404)
    device_model = get_device_model(device.type)
    device_data = request.get_json()
    for key in device_data.keys():
        if key not in device_model().__dict__['declared_fields'].keys():
            raise APIError('device does not have field of type {}'.format(key),
                           status_code=400)

    db.session.query(get_device_table_name(device.type)).filter_by(device_id=device_id).update(device_data, synchronize_session=False)
    db.session.commit()

    return jsonify({'success': 'successfully modified device'})


################# ROOM ROUTES ################################################


@app.route('/api/room', methods=['GET'])
def get_all_rooms():
    rooms = db.session.query(models.Room).all()
    for room in rooms:
        room.total_power = get_room_total_power(room)
        room.device_count = get_room_device_count(room)
        room.current_power = get_room_current_power(room)
    room_schema = serialisers.RoomSchema(many=True)
    return jsonify({'rooms': room_schema.dump(rooms)})


@app.route('/api/room/<int:r_id>', methods=['GET'])
def get_room(r_id):
    room = db.session.query(models.Room).filter_by(room_id=r_id).first()
    if room is None:
        raise APIError(detail='cannot find room with ID: {}'.format(r_id),
                       status_code=404)
    room.total_power = get_room_total_power(room)
    room.device_count = get_room_device_count(room)
    room.current_power = get_room_current_power(room)
    room_schema = serialisers.RoomSchema()
    return jsonify(room_schema.dump(room))

@app.route('/api/room/<int:r_id>', methods=['DELETE'])
def delete_room(r_id):
    room = db.session.query(models.Room).filter_by(room_id=r_id).first()
    if room is None:
        raise APIError(detail='cannot find room with ID: {}'.format(r_id),
                       status_code=404)
    delete_q = models.Room.__table__.delete().where(models.Room.room_id == r_id)
    db.session.execute(delete_q)
    db.session.commit()
    return jsonify({'success': 'room deleted'}), 200


@app.route('/api/room', methods=['POST'])
def add_room():
    room_data = request.get_json()
    if not room_data['room_name']:
        raise APIError(detail='no room name supplied', status_code=400)

    db.session.add(models.Room(room_name=room_data['room_name']))
    db.session.commit()
    room_id = db.session.query(models.Room).filter_by(room_name=room_data['room_name']).first().room_id
    return jsonify({'success': 'room ID: {} succesfully added'.format(room_id)}), 201



@app.route('/api/room/<int:r_id>/devices', methods=['GET'])
def get_devices_in_room(r_id):
    room = db.session.query(models.Room).filter_by(room_id=r_id).first()
    if room is None:
        raise APIError(detail='cannot find room with ID: {}'.format(r_id),
                       status_code=404)
    devices = room.devices
    devices_json = [get_device_model(device.type)().dump(device) for device
                    in devices]
    return jsonify({'devices': devices_json})


################# HELPER FUNCTIONS ################################################
def get_room_device_count(room):
    return db.session.query(models.Devices).filter_by(room_id=room.room_id).count()


def get_room_total_power(room):
    total_power = db.session.query(func.sum(models.Devices.rated_power)).filter_by(room_id=room.room_id).scalar()

    if total_power is None:
        total_power = 0
    return total_power


def get_room_current_power(room):
    current_power = db.session.query(func.sum(models.Devices.rated_power)).filter(and_(models.Devices.room_id==room.room_id, models.Devices.is_on==True)).scalar()

    if current_power is None:
        current_power = 0
    return current_power


def get_device_table_name(device_type):
    device_types = {
        'light': models.Lights,
        'tv': models.TV,
        'plug': models.Plug,
        'thermostat': models.Thermostat,
        'solar': models.Solar
    }

    return device_types.get(device_type)
