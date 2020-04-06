## @package manage.py
#
# \brief
# \details
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \copyright MIT License.
#

#!/usr/bin/env python3
# services/users/manage.py
from flask.cli import FlaskGroup
from project import app, db
from project.models import Usage, Devices, Room, TV
from sqlalchemy.schema import DropTable
from sqlalchemy.ext.compiler import compiles
import csv
import os


cli = FlaskGroup(app)


@cli.command('create_db')
def create_db():
    db.reflect()
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command('seed_db')
def seed_db():

#    db.session.add(User(username='admin', email='nobody@nowhere.address',
#                        password_hash='totally a real hash'))

    living_room = Room(room_id=0, room_name='living_room')
    outside = Room(room_name='outside')
    bedroom_1 = Room(room_name='bedroom_1')
    bedroom_2 = Room(room_name='bedroom_2')
    kitchen = Room(room_name='kitchen')
    bathroom_1 = Room(room_name='bathroom_1')

    db.session.add(living_room)
    db.session.add(outside)
    db.session.add(bedroom_1)
    db.session.add(bedroom_2)
    db.session.add(kitchen)
    db.session.add(bathroom_1)
    db.session.commit()

    db.session.add(TV(device_id=0, device_name='Living Room TV',
                      rated_power=700, fault=False, room=living_room,
                      on=True))
    db.session.add(Devices(device_name='Outside Lights', rated_power=40,
                           fault=False, room=outside, on=True))
    db.session.add(Devices(device_name='Bedroom 1 Lights', rated_power=40,
                           fault=False, room=bedroom_1, on=True))
    db.session.add(Devices(device_name='Bedroom 2 Lights', rated_power=40,
                           fault=False, room=bedroom_2, on=True))
    db.session.add(Devices(device_name='Kitchen Lights', rated_power=40,
                           fault=False, room=kitchen, on=True))
    db.session.add(Devices(device_name='Living Room Lights 1', rated_power=40,
                           fault=False, room=living_room, on=True))
    db.session.add(Devices(device_name='Living Room Lights 2', rated_power=40,
                           fault=False, room=living_room, on=True))
    db.session.add(Devices(device_name='Bathroom 1 Lights', rated_power=40,
                           fault=False, room=bathroom_1, on=True))
    db.session.add(Devices(device_name='Kitchen Plug', rated_power=500,
                           fault=True, room=kitchen, on=True))
    db.session.commit()

    with open(os.getcwd() + '/mock_data/dev_1.txt', 'r') as f:
        reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
        next(reader)  # skip csv header
        for row in reader:
            db.session.add(Usage(device_id=row[0], date=row[1], time=row[2],
                           energy_usage=row[3]))

    with open(os.getcwd() + '/mock_data/dev_2.txt', 'r') as f:
        reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
        next(reader)  # skip csv header
        for row in reader:
            db.session.add(Usage(device_id=row[0], date=row[1], time=row[2],
                           energy_usage=row[3]))

    with open(os.getcwd() + '/mock_data/dev_3.txt', 'r') as f:
        reader = csv.reader(f, delimiter=';', quoting=csv.QUOTE_NONE)
        next(reader)  # skip csv header
        for row in reader:
            db.session.add(Usage(device_id=row[0], date=row[1], time=row[2],
                           energy_usage=row[3]))
    db.session.commit()


if __name__ == '__main__':
    cli()
