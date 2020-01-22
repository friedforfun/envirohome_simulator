from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from passlib.apps import custom_app_context as pwd_context

app = Flask(__name__)
# Pull the config in init
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

# Create user table in database, with id, email, and active columns
class User(db.Model):
	__tablename__ = "users"

	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(128), unique=True, nullable=False)
	email = db.Column(db.String(128), unique=True, nullable=True)
	password_hash = db.Column(db.String(128), index=True, nullable=False)
	active = db.Column(db.Boolean(), default=True, nullable=False)

	def __init__(self, username):
		self.username = username

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)


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
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    # validate JSON data
    if username is None or password is None:
        abort(400) # missing arguments
    if User.query.filter_by(username = username).first() is not None:
        abort(400) # existing user

    # add user data to database
    user = User(username = username)
    user  = User(email = email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username }), 201, {'Location': url_for('get_user', id = user.id, _external = True)}

@app.route("/api/devices", methods = ["GET"])
#@auth.login_required
def get_devices():
	return jsonify(json="device list")

@app.route("/api/floorplan", methods = ["GET"])
#@auth.login_required
def get_floorplan():
	return jsonify(image="floorplan.png")

