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
    while True:
        start_time = time.time()
        devices = db.session.query(models.Devices).all()
        for device in devices:
            usage = device.rated_power * (time.time() - start_time) / 3.6e+6

            data = {'timestamp': datetime.datetime.now().__str__(),
                    'usage': usage}
            #print(data)
            headers = {"Content-Type": "application/json",
                       "ES-EventType": "UploadUsageData",
                       "ES-EventId": "{}".format(uuid.uuid4())}
            #print(headers)
            stream_name = 'device_{}'.format(device.device_id)
            res = requests.post(base_url + stream_name, json=data, headers=headers,
                                auth=requests.auth.HTTPBasicAuth('admin', 'changeit'))
            #print(res.status_code)
        time.sleep(1)
