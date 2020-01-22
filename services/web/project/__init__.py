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
	email = db.Column(db.String(128), unique=True, nullable=False)
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