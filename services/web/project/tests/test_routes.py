from project import app, db
from project.routes import get_usage
from project.models import User, Devices, Usage
import unittest
import json
import os
import csv


class TestStringMethods(unittest.TestCase):
    def setUp(self):
        with app.app_context():
            app.config['TESTING'] = True
            app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL",
                                                              "sqlite://")
            self.app = app.test_client()
            db.create_all()
            self.create_db()
            self.seed_db()

    def create_db(self):
        db.drop_all()
        db.create_all()
        db.session.commit()

    def seed_db(self):
        db.session.add(User(username='admin', email='nobody@nowhere.address',
                            password_hash='totally a real hash'))

        db.session.add(Devices(device_id=0, device_name='Living Room TV',
                            rated_power=700, device_type='tv', fault=False,
                            room='living_room', on=True))
        db.session.add(Devices(device_name='Outside Lights', rated_power=40,
                            device_type='lights', fault=False, room='outside',
                            on=True))
        db.session.add(Devices(device_name='Bedroom 1 Lights', rated_power=40,
                            device_type='lights', fault=False, room='bedroom_1',
                            on=True))
        db.session.add(Devices(device_name='Bedroom 2 Lights', rated_power=40,
                            device_type='lights', fault=False, room='bedroom_2',
                            on=True))
        db.session.add(Devices(device_name='Kitchen Lights', rated_power=40,
                            device_type='lights', fault=False, room='kitchen',
                            on=True))
        db.session.add(Devices(device_name='Living Room Lights 1', rated_power=40,
                            device_type='lights', fault=False, room='living_room',
                            on=True))
        db.session.add(Devices(device_name='Living Room Lights 2', rated_power=40,
                            device_type='lights', fault=False, room='living_room',
                            on=True))
        db.session.add(Devices(device_name='Bathroom 1 Lights', rated_power=40,
                            device_type='lights', fault=False, room='bathroom_1',
                            on=True))

        db.session.add(Devices(device_name='Kitchen Plug', rated_power=500,
                            device_type='plug', fault=True, room='kitchen',
                            on=True))
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

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_usage(self):
        with app.app_context():
            json_api = get_usage(1, '30012020', '00:37:00')
            json_real = json.loads('[ { "date": "2020-01-30", "device_id": 1, "energy_usage": 0.0, "time": "00:37:00" } ]')

            self.assertEqual(json_api.get_json(), json_real)
            self.assertEqual(json_api.mimetype, 'application/json')


if __name__ == '__main__':
    unittest.main()
