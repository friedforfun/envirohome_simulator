from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Pull the config in init
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

# Create user table in database, with id, email, and active columns
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, email):
        self.email = email

# Configure basic route for testing
@app.route("/")
def hello_world():
    return jsonify(hello="world")