from project import create_celery_app, app, db
import project.models as models
import time
import os
import uuid
import requests
import datetime
import json

# create celery app
celery = create_celery_app(app)

# base url for publishing to streams
base_url = 'http://' + os.environ['HOST_IP'] + ':2113/streams/'

# generator for device power usage coefficients
# is seeded by household_power_consumption.txt
effective_gen = (float(row)/31.0 for row in open('data/household_power_consumption.txt'))


def post_to_stream(stream_name, data):
    '''publish data to a given stream
    args:
        :stream_name: which stream to publish to
        :data: data to publish to :stream_name:
    '''
    headers = {'Content-Type': 'application/json',
               'ES-EventType': 'UploadUsageData',
               'ES-EventId': '{}'.format(uuid.uuid4())}

    requests.post(base_url + stream_name, json=data, headers=headers,
                  auth=requests.auth.HTTPBasicAuth('admin', 'changeit'))


def emit_usage_event(interval, stream_suffix):
    '''publish usage information per unit time'''
    devices = db.session.query(models.Devices).all()
    rooms = db.session.query(models.Room).all()
    db.session.commit()

    for device in devices:
        usage = device.rated_power * -1 * interval if device.is_generator else device.rated_power * next(effective_gen) * interval if device.is_on else 0

        data = {'timestamp': datetime.datetime.now().__str__(),
                'usage': usage}

        stream_name = 'device_{}_{}'.format(device.device_id,
                                            stream_suffix)
        post_to_stream(stream_name, data)

    for room in rooms:
        usage = sum([device.rated_power * -1 * interval
                     if device.is_generator
                     else device.rated_power * next(effective_gen) * interval
                     if device.is_on
                     else 0
                     for device in room.devices])

        data = {'timestamp': datetime.datetime.now().__str__(),
                'usage': usage}
        stream_name = 'room_{}_{}'.format(room.room_id,
                                          stream_suffix)
        post_to_stream(stream_name, data)

    usage = sum([device.rated_power * -1 * interval
                 if device.is_generator
                 else device.rated_power * next(effective_gen) * interval
                 if device.is_on
                 else 0
                 for device in devices])

    data = {'timestamp': datetime.datetime.now().__str__(),
            'usage': usage}

    post_to_stream('home_{}'.format(stream_suffix), data)

    time.sleep(interval)


@celery.task
def emit_usage_event_second():
    '''celery task for publishing per second streams'''
    while True:
        emit_usage_event(1, 'second')


@celery.task
def emit_usage_event_minute():
    '''celery task for publishing per minute streams'''
    time.sleep(2)
    devices = db.session.query(models.Devices).all()
    rooms = db.session.query(models.Room).all()
    db.session.commit()

    data = {'timestamp': datetime.datetime.now().__str__(),
            'usage': 0}

    device_names = ['device_{}_minute'.format(device.device_id)
                    for device
                    in devices]

    for device_name in device_names:
        post_to_stream(device_name, data)

    room_names = ['room_{}_minute'.format(room.room_id)
                  for room
                  in rooms]

    for room_name in room_names:
        post_to_stream(room_name, data)

    post_to_stream('home_minute', data)

    while True:
        time.sleep(60)
        emit_usage_event(60, 'minute')


@celery.task
def emit_usage_event_hour():
    '''celery task for publishing per hour streams'''
    time.sleep(2)
    devices = db.session.query(models.Devices).all()
    rooms = db.session.query(models.Room).all()
    db.session.commit()

    data = {'timestamp': datetime.datetime.now().__str__(),
            'usage': 0}

    device_names = ['device_{}_hour'.format(device.device_id)
                    for device
                    in devices]

    for device_name in device_names:
        post_to_stream(device_name, data)

    room_names = ['room_{}_hour'.format(room.room_id)
                  for room
                  in rooms]

    for room_name in room_names:
        post_to_stream(room_name, data)

    post_to_stream('home_hour', data)

    while True:
        time.sleep(3600)
        emit_usage_event(3600, 'hour')
