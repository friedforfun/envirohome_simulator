## @package routes.py
#
# \brief
# \details
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug
# \copyright MIT License.
#

# from flask import Flask, jsonify
from project import app
from project.models import User
from flask import jsonify

# Configure basic route for testing
@app.route("/")
def hello_world():
    return User.get_delete_put_post(1)


@app.route("/login", methods=["POST"])
def login():
    return jsonify(user="password")


# Register new user method
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


## get_devices()
# instatiates a session to the database and parses everything in the devices table
# formats it into JSON
# Returns all devices in JSON format
def get_devices():
    return Devices.get_delete_put_post(None)


@app.route("/api/device/<device_pk>", methods=["GET"])
def get_device(device_pk):
    return Devices.get_delete_put_post(device_pk)


@app.route("/api/floorplan", methods=["GET"])
# @auth.login_required
def get_floorplan():
    return jsonify(image="floorplan.png")
