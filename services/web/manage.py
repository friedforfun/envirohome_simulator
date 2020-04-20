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
import project.models as models
import project.tasks as tasks
import requests
import csv
import os
import time
import datetime
import uuid


cli = FlaskGroup(app)


@cli.command('start_usage_second')
def start_usage_second():
    tasks.emit_usage_event_second.delay()


@cli.command('start_usage_minute')
def start_usage_minute():
    tasks.emit_usage_event_minute.delay()


@cli.command('start_usage_hour')
def start_usage_hour():
    tasks.emit_usage_event_hour.delay()


@cli.command('create_db')
def create_db():
    db.reflect()
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command('seed_db')
def seed_db():
    living_room = models.Room(room_id=0, room_name='Living Room')
    outside = models.Room(room_name='Outside')
    bedroom_1 = models.Room(room_name='Bedroom 1')
    bedroom_2 = models.Room(room_name='Bedroom 2')
    kitchen = models.Room(room_name='Kitchen')
    bathroom_1 = models.Room(room_name='Bathroom 1')

    db.session.add(living_room)
    db.session.add(outside)
    db.session.add(bedroom_1)
    db.session.add(bedroom_2)
    db.session.add(kitchen)
    db.session.add(bathroom_1)
    db.session.commit()

    db.session.add(models.TV(device_id=0, device_name='Living Room TV',
                   rated_power=700, is_fault=False, room=living_room,
                   is_on=True))
    db.session.add(models.Lights(device_name='Outside Lights', rated_power=40,
                                 is_fault=False, room=outside, is_on=True))
    db.session.add(models.Lights(device_name='Bedroom 1 Lights', rated_power=40,
                                 is_fault=False, room=bedroom_1, is_on=True))
    db.session.add(models.Lights(device_name='Bedroom 2 Lights', rated_power=40,
                                 is_fault=False, room=bedroom_2, is_on=True))
    db.session.add(models.Lights(device_name='Kitchen Lights', rated_power=40,
                                 is_fault=False, room=kitchen, is_on=True))
    db.session.add(models.Lights(device_name='Living Room Lights 1', rated_power=40,
                                 is_fault=False, room=living_room, is_on=True))
    db.session.add(models.Lights(device_name='Living Room Lights 2', rated_power=40,
                                 is_fault=False, room=living_room, is_on=True))
    db.session.add(models.Lights(device_name='Bathroom 1 Lights', rated_power=40,
                                 is_fault=False, room=bathroom_1, is_on=True))
    db.session.add(models.Plug(device_name='Kitchen Plug', rated_power=500,
                               is_fault=True, room=kitchen, is_on=True))
    db.session.commit()


if __name__ == '__main__':
    cli()
