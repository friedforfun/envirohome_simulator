## @package models.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020  
# \copyright MIT License.
#

# https://github.com/Martlark/flask-serialize
from project import db


# Create user table in database, with id, email, and active columns
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=True)
    password_hash = db.Column(db.String(128), index=True, nullable=False)
    is_active = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)


class Room(db.Model):
    room_id = db.Column(db.Integer, primary_key=True, nullable=False)
    room_name = db.Column(db.String(255), nullable=False)
    devices = db.relationship('Devices', backref='room',
                              cascade="all,delete")


# Create devices table in database, with id, name and type columns
class Devices(db.Model):
    __tablename__ = 'devices'
    device_id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(64), nullable=False, unique=True)
    rated_power = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50))
    is_fault = db.Column(db.Boolean, default=False, nullable=False)
    is_on = db.Column(db.Boolean, default=True, nullable=False)
    is_generator = db.Column(db.Boolean, default=False, nullable=False)
    usage = db.relationship('Usage', backref='device',
                            cascade="all,delete", uselist=False)
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


class Solar(Devices):
    is_generator = True

    __mapper_args__ = {
        'polymorphic_identity': 'solar'
    }


# Create usage table in database, with id, date, time and energy usage columns
class Usage(db.Model):
    usage_id = db.Column(db.Integer, primary_key=True, nullable=False,
                         autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.device_id',
        ondelete='cascade'))
    date = db.Column(db.Date, nullable=False, primary_key=True)
    time = db.Column(db.Time, nullable=False, primary_key=True)
    energy_usage = db.Column(db.Float)
