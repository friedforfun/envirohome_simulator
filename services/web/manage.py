## @package manage.py
#
# \brief
# \details
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug
# \copyright MIT License.
#

#!/usr/bin/env python3
# services/users/manage.py
from flask.cli import FlaskGroup
from project import app, db
from project.models import User, Usage, Devices
import csv
import os


cli = FlaskGroup(app)

# Create command at CLI to create and apply new database model
@cli.command('create_db')
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command('seed_db')
def seed_db():
    db.session.add(User(username='admin', email='nobody@nowhere.address',
                        password_hash='totally a real hash'))
    db.session.add(Devices(device_id=0, device_name='Living Room TV',
                           rated_power=700, device_type='tv', fault=False,
                           room='living_room'))
    db.session.add(Devices(device_name='Outside Lights', rated_power=40,
                           device_type='lights', fault=False, room='outside'))
    db.session.add(Devices(device_name='Kitchen Plug', rated_power=500,
                           device_type='plug', fault=True, room='kitchen'))
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


# flaskgroup instance to exend the normal cli with flask commands
if __name__ == '__main__':
    cli()
