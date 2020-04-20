from project import create_celery_app, app, db
import project.models as models
import time
import os
import uuid
import requests
import datetime
import json

celery = create_celery_app(app)

base_url = 'http://' + os.environ['HOST_IP'] + ':2113/streams/'
effective_power = 0.6  # this is the % of rated power used while active
                       # in actual implementation, would be measured


def post_to_stream(stream_name, data):
    headers = {"Content-Type": "application/json",
               "ES-EventType": "UploadUsageData",
               "ES-EventId": "{}".format(uuid.uuid4())}

    requests.post(base_url + stream_name, json=data, headers=headers,
                  auth=requests.auth.HTTPBasicAuth('admin', 'changeit'))


def emit_usage_event(interval, stream_suffix):
    devices = db.session.query(models.Devices).all()
    rooms = db.session.query(models.Room).all()
    db.session.commit()

    for device in devices:
        usage = device.rated_power * effective_power \
                                   * interval \
                if device.is_on else 0

        data = {'timestamp': datetime.datetime.now().__str__(),
                'usage': usage}

        stream_name = 'device_{}_{}'.format(device.device_id,
                                            stream_suffix)
        post_to_stream(stream_name, data)

    for room in rooms:
        usage = sum([device.rated_power * effective_power
                                        * interval
                     if device.is_on
                     else 0
                     for device in room.devices])

        data = {'timestamp': datetime.datetime.now().__str__(),
                'usage': usage}
        stream_name = 'room_{}_{}'.format(room.room_id,
                                          stream_suffix)
        post_to_stream(stream_name, data)

    usage = sum([device.rated_power * effective_power
                                    * interval
                 if device.is_on
                 else 0
                 for device in devices])

    data = {'timestamp': datetime.datetime.now().__str__(),
            'usage': usage}

    post_to_stream('home_{}'.format(stream_suffix), data)

    time.sleep(interval)


@celery.task
def emit_usage_event_second():
    while True:
        emit_usage_event(1, 'second')


@celery.task
def emit_usage_event_minute():
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
