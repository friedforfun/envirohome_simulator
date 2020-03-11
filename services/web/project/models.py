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


## \brief Create user table
#
# Create user table in database, with id, email, and active columns
class User(db.Model, FlaskSerializeMixin):
    ## \brief Table of users
    #
    #
    __tablename__ = "users"

    ## \brief Stores id
    #
    # Stores id of user 
    id = db.Column(db.Integer, primary_key=True)

    ## \brief Stores id
    #
    # Stores id of user 
    public_id = db.Column(db.String(50), unique=True)

    ## \brief Stores username
    #
    # Stores username of the user
    username = db.Column(db.String(128), unique=True, nullable=False)

    ## \brief Stores email
    #
    # Stores the email of the user
    email = db.Column(db.String(128), unique=True, nullable=True)

    ## \brief Stores password hash
    #
    # Stores the password hash of the user
    password_hash = db.Column(db.String(128), index=True, nullable=False)

    ## \brief Stores active status
    #
    #
    active = db.Column(db.Boolean(), default=False, nullable=False)

    admin = db.Column(db.Boolean(), default=False, nullable=False)

    # def __init__(self, username, email, password_hash):
    #     self.username = username
    #     self.password_hash = password_hash
    #     self.email = email

    # def hash_password(self, password):
    #     self.password_hash = pwd_context.encrypt(password)

    # def verify_password(self, password):
    #     return pwd_context.verify(password, self.password_hash)


## Create devices table in database, with id, name and type columns
## \brief Create devices table
class Devices(db.Model, FlaskSerializeMixin):
    ## \brief Table of devices
    #
    #
    __tablename__ = 'devices'

    ## \brief Stores id
    #
    # Stores id of the device
    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief Stores mac address
    #
    # Stores the mac address of the device
    mac_addr = db.Column(db.String(17), nullable=True)
    ## \brief Stores name
    #
    # Stores name of the device
    device_name = db.Column(db.String(64), nullable=False)
    ## \brief Stores power rating
    #
    # Stores the power rating of the device
    rated_power = db.Column(db.Integer, nullable=False)
    ## \brief Stores device type
    #
    # Stores the type of the device
    device_type = db.Column(db.Enum('tv', 'plug', 'lights',
                                    name='device_type'), nullable=False)
    ## \brief Stores faults
    #
    # Stores whether there are any faults with the devicde
    fault = db.Column(db.Boolean, default=False, nullable=False)
    ## \brief Stores on state
    #
    # Stores whether the device is on or not
    on = db.Column(db.Boolean, default=False, nullable=False)
    ## \brief Stores room
    #
    # Stores the room where the device is located
    room = db.Column(db.Enum('living_room', 'kitchen', 'outside',
                             'bedroom_1', 'bedroom_2', 'bathroom_1',
                             name='room'), nullable=False)
    ## \brief Stores TV
    tv = db.relationship('TV', backref='device', uselist=False)
    ## \brief Stores thermometer 
    #
    # Stores the thermometer device
    therm = db.relationship('Thermostat', backref='device', uselist=False)
    ## \brief Stores plug
    #
    # Stores the plug device 
    plug = db.relationship('Plug', backref='device', uselist=False)
    ## \brief Stores light
    #
    # Stores the light device
    light = db.relationship('Lights', backref='device', uselist=False)
    ## \brief Stores usage
    # 
    # Stores the energy usage of the devicde
    usage = db.relationship('Usage', backref='device', uselist=False)


## Create TV table in database, with id, channel, output and volume columns
## \brief create TV table
class TV(db.Model, FlaskSerializeMixin):
    ## \brief Stores id
    #
    # Stores the id of the TV
    tv_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief Stores device id
    #
    # Stores the id of the device
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief Stores channel
    #
    # Stores the channel of the TV
    channel = db.Column(db.Integer, default=1)
    ## \brief Stores output
    #
    # Stores the selected output of the TV
    output = db.Column(db.Enum('HDMI1', 'HDMI2', 'ANT', 'DVD', 'VIDEO',
                       name='channel'), default='HDMI1')
    ## \brief Stores volume
    #
    # Stores the current volume of the TV
    volume = db.Column(db.Integer, default=100)

## \brief Create thermostat table
#
# Create thermostat table in database, with id and temperature columns
class Thermostat(db.Model, FlaskSerializeMixin):
    ## \brief Stores id
    #
    # Stores the id of the thermometer 
    therm_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief Stores device id
    #
    # Stores the id of the device
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief Stores temperature
    #
    # Stores the temperature of the thermometer
    temp = db.Column(db.Integer, default=23)

## \brief Create plug table
#
# Create plug table in database, with id columns
class Plug(db.Model, FlaskSerializeMixin):
    ## \brief stores the id of the plug
    #
    #
    plug_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief stores the id of the device
    #
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))

## \brief Create lights table
#
# Create lights table in database, with id, intensity, and colour columns
class Lights(db.Model, FlaskSerializeMixin):
    ## \brief Stores the id of the light
    #
    #
    light_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ## \brief Stores the id of the device
    #
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'))
    ## \brief Stores the intensity of the light.
    # the settings are 0-100%, dimmer
    intensity = db.Column(db.Integer, default=1) 
    ## \brief Stores the colour of the light
    # RGB values
    colour = db.Column(db.Integer, default=0)

## \brief Create usage table
#
# Create usage table in database, with id, date, time and energy usage columns
class Usage(db.Model, FlaskSerializeMixin):
    ## \brief stores id of the device
    #
    #
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id'),
                          primary_key=True, nullable=False)
    ## \brief stores the date
    #
    #
    date = db.Column(db.Date, nullable=False, primary_key=True)
    ## \brief stores the time
    #
    #
    time = db.Column(db.Time, nullable=False, primary_key=True)
    ## \brief  stores the energy usage
    #
    #
    energy_usage = db.Column(db.Float)


