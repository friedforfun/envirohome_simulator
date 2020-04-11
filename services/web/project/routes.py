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
from sqlalchemy import or_
from werkzeug.security import check_password_hash, generate_password_hash
from marshmallow import ValidationError
from functools import wraps
import project.models as models
import project.serialisers as serialisers
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

        return func(current_user, *args, **kwargs)
    return wrapper


@app.route("/")
@token_required
def hello_world(current_user):
    return models.User.get_delete_put_post(1)


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
        return jsonify({"token": token.decode('UTF-8')})
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


@app.route("/api/devices", methods=["GET"])
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
    devices = db.session.query(models.Devices).filter_by(device_id=d_id).first()
    device_model = serialisers.DeviceSchema()
    return jsonify(device_model.dump(devices))


@app.route("/api/device/<device_pk>/toggle_power", methods=["GET"])
def toggle_power(device_pk):
    device = db.session.query(models.Devices).filter_by(device_id=device_pk).first()
    power_state = device.is_on
    device.is_on = not power_state
    db.session.commit()
    return jsonify({'success': 'device ID: {} power was toggled successfully'.format(device_pk)})


@app.route("/api/device", methods=["POST"])
def add_device(name_pk, rated_power_pk, device_type_pk, room_pk):
    db.session.add(models.Devices(device_name=name_pk, rated_power=rated_power_pk,
                                  device_type=device_type_pk, fault=False,
                                  room=room_pk, on=True))
    db.session.commit()
    return models.Devices.get_delete_put_post(None)


################# USAGE ROUTES ################################################


## \brief get_usage()
#
# Gets the energy usage
@app.route("/api/usage/<int:device_pk>/<string:date_pk>/<string:time_pk>",
           methods=["GET"])
def get_usage(device_pk, date_pk, time_pk):
    ## convert UK date to OSI
    date_pk = date_pk[4:] + '-' + date_pk[2:4] + '-' + date_pk[0:2]
    usages = db.session.query(models.Usage).filter_by(device_id=device_pk,
                                               date=date_pk,
                                               time=time_pk).all()
#    usages = db.session.query(Usage).filter_by(device_id=device_pk).all()
    usage_schema = serialisers.UsageSchema(many=True)
    result = usage_schema.dump(usages)
    return jsonify(result)


################# ROOM ROUTES ################################################


@app.route('/api/room', methods=['GET'])
def get_all_rooms():
    rooms = db.session.query(models.Room).all()
    room_schema = serialisers.RoomSchema(many=True)
    return jsonify({'rooms': room_schema.dump(rooms)})


@app.route('/api/room/<int:r_id>', methods=['GET'])
def get_room(r_id):
    room = db.session.query(models.Room).filter_by(room_id=r_id).first()
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
    return jsonify({'success': 'user deleted'}), 200
