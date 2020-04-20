from project import create_celery_app, app, db
import project.models as models
import time
import os
import uuid
import requests
import datetime
import json

celery = create_celery_app(app)


@celery.task
def emit_usage_event():
    base_url = 'http://' + os.environ['HOST_IP'] + ':2113/streams/'
    effective_power = 0.6  # this is the % of rated power used while active
                           # in actual implementation, would be measured
    while True:
        start_time = time.time()
        devices = db.session.query(models.Devices).all()
        rooms = db.session.query(models.Room).all()
        db.session.commit()

        for device in devices:
            usage = device.rated_power * effective_power \
                                       * (time.time() - start_time) / 3.6e+6 \
                    if device.is_on else 0

            data = {'timestamp': datetime.datetime.now().__str__(),
                    'usage': usage}
            headers = {"Content-Type": "application/json",
                       "ES-EventType": "UploadUsageData",
                       "ES-EventId": "{}".format(uuid.uuid4())}

            stream_name = 'device_{}'.format(device.device_id)
            requests.post(base_url + stream_name, json=data, headers=headers,
                          auth=requests.auth.HTTPBasicAuth('admin', 'changeit'))

        for room in rooms:
            stream_name = 'room_{}'.format(room.room_id)
            usage = sum([device.rated_power * effective_power
                         if device.is_on
                         else 0
                         for device in rooms[0].devices])

            data = {'timestamp': datetime.datetime.now().__str__(),
                    'usage': usage}
            headers = {"Content-Type": "application/json",
                       "ES-EventType": "UploadUsageData",
                       "ES-EventId": "{}".format(uuid.uuid4())}
            requests.post(base_url + stream_name, json=data, headers=headers,
                          auth=requests.auth.HTTPBasicAuth('admin', 'changeit'))
        time.sleep(1)
