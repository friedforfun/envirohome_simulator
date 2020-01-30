## @package models.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug       
# \copyright MIT License.
#

from flask_sqlalchemy import SQLAlchemy
from project import app, db


# Create user table in database, with id, email, and active columns
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=True)
    password_hash = db.Column(db.String(128), index=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    # def __init__(self, username, email, password_hash):
    #     self.username = username
    #     self.password_hash = password_hash
    #     self.email = email

    # def hash_password(self, password):
    #     self.password_hash = pwd_context.encrypt(password)

    # def verify_password(self, password):
    #     return pwd_context.verify(password, self.password_hash)


class Devices(db.Model):
    __tablename__ = 'devices'
    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mac_addr = db.Column(db.String(17), nullable=True)
    device_name = db.Column(db.String(64), nullable=False)
    rated_power = db.Column(db.Integer, nullable=False)
    device_type = db.Column(db.Enum('tv', 'plug', 'lights',
                                    name="device_type"))
    fault = db.Column(db.Boolean, default=False, nullable=False)
    tv = db.relationship('TV', backref='device', uselist=False)


class TV(db.Model):
    tv_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    channel = db.Column(db.Integer, default=1)
    output = db.Column(db.Enum('HDMI1', 'HDMI2', 'ANT', 'DVD', 'VIDEO',
                       name='channel'), default='HDMI1')
    volume = db.Column(db.Integer, default=100)


"""
class Thermostat(db.Model):


class Plug(db.Model):


class Lights(db.Model):


class Usage(db.Model):
"""
