from flask import Flask, jsonify
from project import app

# Configure basic route for testing
@app.route("/")
def hello_world():
    return jsonify(hello="world")

@app.route("/login", methods = ["POST"])
def login():
    return jsonify(user="password")

# Register new user method
@app.route("/register", methods = ["POST"])
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
    # return jsonify({ 'username': user.username }), 201, {'Location': url_for('get_user', id = user.id, _external = True)}
    return jsonify(test="something")

@app.route("/api/devices", methods = ["GET"])
#@auth.login_required
def get_devices():
    return jsonify(json="device list")

@app.route("/api/floorplan", methods = ["GET"])
#@auth.login_required
def get_floorplan():
    return jsonify(image="floorplan.png")