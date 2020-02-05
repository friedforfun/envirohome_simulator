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
from project.models import User, Devices, Usage
from flask import jsonify
from flask_marshmallow import Marshmallow

ma = Marshmallow(app)

##
#
class UsageSchema(ma.Schema):
    class Meta:
        fields = ('device_id', 'date', 'time', 'energy_usage')


usage_schema = UsageSchema(many=True)

## \brief Configure basic route for testing
#
@app.route("/")
def hello_world():
    return User.get_delete_put_post(1)

## \brief
#
@app.route("/login", methods=["POST"])
def login():
    return jsonify(user="password")


## \brief Register new user method
#
@app.route("/register", methods=["POST"])
def new_user():
    # Username and password are generated from a JSON via POST
    # username = request.json.get('username')
    # email = request.json.get('email')
    # password = request.json.get('password')

    # # validate JSON data
    # if username is None or password is None:
    #     abort(400) # missing arguments
    # if User.query.filter_by(username = username).first() is not None:
    #     abort(400) # existing user

    # # add user data to database
    # user = User(username = username)
    # user  = User(email = email)
    # user.hash_password(password)
    # db.session.add(user)
    # db.session.commit()
    # return jsonify({ 'username': user.username }), 201, {'Location': url_for(
    # 'get_user', id = user.id, _external = True)}
    return jsonify(test="something")


@app.route("/api/devices", methods=["GET"])
# @auth.login_required


## \brief get_devices()
# instatiates a session to the database and parses everything in the devices table
# formats it into JSON
# Returns all devices in JSON format
def get_devices():
    return Devices.get_delete_put_post(None)

## \brief get_device()
#
@app.route("/api/device/<device_pk>", methods=["GET"])
def get_device(device_pk):
    return Devices.get_delete_put_post(device_pk)

## \brief get_floorplan()
#
@app.route("/api/floorplan", methods=["GET"])
# @auth.login_required
def get_floorplan():
    return jsonify(image="floorplan.png")

## \brief get_usage()
#
@app.route("/api/usage/<int:device_pk>/<string:date_pk>/<string:time_pk>",
           methods=["GET"])
def get_usage(device_pk, date_pk, time_pk):
    ## convert UK date to OSI
    date_pk = date_pk[4:] + '-' + date_pk[2:4] + '-' + date_pk[0:2]
    usages = db.session.query(Usage).filter_by(device_id=device_pk,
                                               date=date_pk,
                                               time=time_pk).all()
#    usages = db.session.query(Usage).filter_by(device_id=device_pk).all()
    result = usage_schema.dump(usages)
    return jsonify(result)
