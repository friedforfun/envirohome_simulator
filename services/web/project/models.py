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


## Create user table in database, with id, email, and active columns
#
class User(db.Model, FlaskSerializeMixin):
    __tablename__ = "users"

    ## \brief 
    #
    id = db.Column(db.Integer, primary_key=True)
    ## \brief 
    #
    username = db.Column(db.String(128), unique=True, nullable=False)
    ## \brief 
    #
    email = db.Column(db.String(128), unique=True, nullable=True)
    ## \brief 
    #
    password_hash = db.Column(db.String(128), index=True, nullable=False)
    ## \brief 
    #
    active = db.Column(db.Boolean(), default=True, nullable=False)

    # def __init__(self, username, email, password_hash):
    #     self.username = username
    #     self.password_hash = password_hash
    #     self.email = email

    # def hash_password(self, password):
    #     self.password_hash = pwd_context.encrypt(password)

    # def verify_password(self, password):
    #     return pwd_context.verify(password, self.password_hash)

## Create devices table in database, with id, name and type columns
#
class Devices(db.Model, FlaskSerializeMixin):
    __tablename__ = 'devices'

    ## \brief 
    #
    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief 
    #
    mac_addr = db.Column(db.String(17), nullable=True)
    ## \brief 
    #
    device_name = db.Column(db.String(64), nullable=False)
    ## \brief 
    #
    rated_power = db.Column(db.Integer, nullable=False)
    ## \brief 
    #
    device_type = db.Column(db.Enum('tv', 'plug', 'lights',
                                    name='device_type'), nullable=False)
    ## \brief 
    #
    fault = db.Column(db.Boolean, default=False, nullable=False)
    ## \brief 
    #
    on = db.Column(db.Boolean, default=False, nullable=False)
    ## \brief 
    #
    room = db.Column(db.Enum('living_room', 'kitchen', 'outside', name='room'),
                     nullable=False)
    ## \brief 
    #
    tv = db.relationship('TV', backref='device', uselist=False)
    ## \brief 
    #
    therm = db.relationship('Thermostat', backref='device', uselist=False)
    ## \brief 
    #
    plug = db.relationship('Plug', backref='device', uselist=False)
    ## \brief 
    #
    light = db.relationship('Lights', backref='device', uselist=False)
    ## \brief 
    #
    usage = db.relationship('Usage', backref='device', uselist=False)

## Create TV table in database, with id, channel, output and volume columns
#
class TV(db.Model, FlaskSerializeMixin):
    ## \brief 
    #
    tv_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief 
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief 
    #
    channel = db.Column(db.Integer, default=1)
    ## \brief 
    #
    output = db.Column(db.Enum('HDMI1', 'HDMI2', 'ANT', 'DVD', 'VIDEO',
                       name='channel'), default='HDMI1')
    ## \brief 
    #
    volume = db.Column(db.Integer, default=100)

## Create thermostat table in database, with id and temperature columns
#
class Thermostat(db.Model, FlaskSerializeMixin):
    ## \brief 
    #
    therm_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief 
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief 
    #
    temp = db.Column(db.Integer, default=23)

## Create plug table in database, with id columns
#
class Plug(db.Model, FlaskSerializeMixin):
    ## \brief stores the id of the plug
    #
    plug_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief stores the id of the device
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))

## Create lights table in database, with id, intensity, and colour columns
#
class Lights(db.Model, FlaskSerializeMixin):
    ## \brief stores the id of the light
    #
    light_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief stores the id of the device
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief stores the intensity of the light.
    # the settings are 0-100%, dimmer
    intensity = db.Column(db.Integer, default=1) 
    ## \brief stores the colour of the light
    # RGB values
    colour = db.Column(db.Integer, default=0)

## Create usage table in database, with id, date, time and energy usage columns
#
class Usage(db.Model, FlaskSerializeMixin):
    ## \brief stores id of the device
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'),
                          primary_key=True, nullable=False)
    ## \brief stores the date
    #
    date = db.Column(db.Date, nullable=False, primary_key=True)
    ## \brief stores the time
    #
    time = db.Column(db.Time, nullable=False, primary_key=True)
    ## \brief  stores the energy usage
    #
    energy_usage = db.Column(db.Float)
