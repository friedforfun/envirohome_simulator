from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
#from passlib.apps import custom_app_context as pwd_context

app = Flask(__name__)

from project import routes
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

    def __init__(self, username, email, password_hash):
        self.username = username
        self.password_hash = password_hash
        self.email = email

    # def hash_password(self, password):
    #     self.password_hash = pwd_context.encrypt(password)

    # def verify_password(self, password):
    #     return pwd_context.verify(password, self.password_hash)
