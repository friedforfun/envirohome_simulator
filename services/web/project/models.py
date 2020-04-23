## @package models.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020  
# \copyright MIT License.
#

from project import db


class User(db.Model):
    # used privately in the database
    # id is never exposed publically, for security reasons (prevent brute
    # forcing).
    id = db.Column(db.Integer, primary_key=True)
    # uuid4 public id is used publically, as it is hard to brute force
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=True)
    # password hash is sha256 with 8000 rounds of pbkdf2
    password_hash = db.Column(db.String(128), index=True, nullable=False)
    # has active session
    is_active = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)


class Room(db.Model):
    room_id = db.Column(db.Integer, primary_key=True, nullable=False)
    room_name = db.Column(db.String(255), nullable=False)
    devices = db.relationship('Devices', backref='room',
                              cascade="all,delete")


# Devices are definied polymorphically
# all devices have an entry in Devices
# devices also have an entry in their device specific table (e.g. TV)
# adding a device to device specific table automatically adds device to Devices
class Devices(db.Model):
    __tablename__ = 'devices'
    device_id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(64), nullable=False, unique=True)
    rated_power = db.Column(db.Integer, nullable=False)
    # used for single table inheritance
    type = db.Column(db.String(50))
    is_fault = db.Column(db.Boolean, default=False, nullable=False)
    is_on = db.Column(db.Boolean, default=True, nullable=False)
    is_generator = db.Column(db.Boolean, default=False, nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.room_id',
                                                  ondelete='cascade'))

    __mapper_args__ = {
        'polymorphic_identity': 'devices',
        'polymorphic_on': type
    }


# Create TV table in database, with id, channel, output and volume columns
class TV(Devices):
    channel = db.Column(db.Integer, default=1)
    output = db.Column(db.Enum('HDMI1', 'HDMI2', 'ANT', 'DVD', 'VIDEO',
                       name='channel'), default='HDMI1')
    volume = db.Column(db.Integer, default=100)

    __mapper_args__ = {
        'polymorphic_identity': 'tv'
    }


# Create thermostat table in database, with id and temperature columns
class Thermostat(Devices):
    temp = db.Column(db.Integer, default=23)

    __mapper_args__ = {
        'polymorphic_identity': 'thermostat'
    }


# Create plug table in database, with id columns
class Plug(Devices):

    __mapper_args__ = {
        'polymorphic_identity': 'plug'
    }


# Create lights table in database, with id, intensity, and colour columns
class Lights(Devices):
    intensity = db.Column(db.Integer, default=1)
    colour = db.Column(db.Integer, default=0)

    __mapper_args__ = {
        'polymorphic_identity': 'lights'
    }


# creates a solar device
# is an example of a generator device
class Solar(Devices):
    is_generator = True

    __mapper_args__ = {
        'polymorphic_identity': 'solar'
    }
