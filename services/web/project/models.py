## @package models.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020  
# \copyright MIT License.
#

from flask_sqlalchemy import SQLAlchemy
# https://github.com/Martlark/flask-serialize
from flask_serialize import FlaskSerializeMixin
from project import app, db


# Create user table in database, with id, email, and active columns
class User(db.Model, FlaskSerializeMixin):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=True)
    password_hash = db.Column(db.String(128), index=True, nullable=False)
    is_active = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)


class Room(db.Model, FlaskSerializeMixin):
    room_id = db.Column(db.Integer, primary_key=True, nullable=False,
                        autoincrement=True)
    room_name = db.Column(db.String(255), nullable=False)
    devices = db.relationship('Devices', backref='room',
                              cascade="all, delete-orphan", lazy='dynamic')


# Create devices table in database, with id, name and type columns
class Devices(db.Model, FlaskSerializeMixin):
    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mac_addr = db.Column(db.String(17), nullable=True)
    device_name = db.Column(db.String(64), nullable=False)
    rated_power = db.Column(db.Integer, nullable=False)
    device_type = db.Column(db.Enum('tv', 'plug', 'lights',
                                    name='device_type'), nullable=False)
    fault = db.Column(db.Boolean, default=False, nullable=False)
    on = db.Column(db.Boolean, default=False, nullable=False)
    tv = db.relationship('TV', backref='device', uselist=False)
    therm = db.relationship('Thermostat', backref='device', uselist=False)
    plug = db.relationship('Plug', backref='device', uselist=False)
    light = db.relationship('Lights', backref='device', uselist=False)
    usage = db.relationship('Usage', backref='device', uselist=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.room_id'))


# Create TV table in database, with id, channel, output and volume columns
class TV(db.Model, FlaskSerializeMixin):
    tv_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    channel = db.Column(db.Integer, default=1)
    output = db.Column(db.Enum('HDMI1', 'HDMI2', 'ANT', 'DVD', 'VIDEO',
                       name='channel'), default='HDMI1')
    volume = db.Column(db.Integer, default=100)


# Create thermostat table in database, with id and temperature columns
class Thermostat(db.Model, FlaskSerializeMixin):
    therm_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    temp = db.Column(db.Integer, default=23)


# Create plug table in database, with id columns
class Plug(db.Model, FlaskSerializeMixin):
    plug_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))


# Create lights table in database, with id, intensity, and colour columns
class Lights(db.Model, FlaskSerializeMixin):
    light_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    intensity = db.Column(db.Integer, default=1)
    colour = db.Column(db.Integer, default=0)


# Create usage table in database, with id, date, time and energy usage columns
class Usage(db.Model, FlaskSerializeMixin):
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'),
                          primary_key=True, nullable=False, autoincrement=True)
    date = db.Column(db.Date, nullable=False, primary_key=True)
    time = db.Column(db.Time, nullable=False, primary_key=True)
    energy_usage = db.Column(db.Float)
