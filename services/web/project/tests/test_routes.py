from project import app, db
import project.routes as r
import project.models as m
import project.serialisers as s
import unittest
import json
import os
import ast

TEST_DB = 'test.db'


class TestRoutes(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite://")
        self.app = app.test_client()
        db.drop_all()
        db.create_all()

    def tearDown(self):
        db.session.close()
        db.drop_all()

    def test_new_user(self):
        user = {'username': 'chs', 'email': 'chs@localhost', 'password': 'letmein'}
        self.app.post('/auth/register', data=json.dumps(user), content_type='application/json')
        db_user = db.session.query(m.User).filter_by(username='chs').first()
        self.assertIsNotNone(db_user)

    def test_login(self):
        user = {'username': 'chs', 'email': 'chs@localhost', 'password': 'letmein'}
        self.app.post('/auth/register', data=json.dumps(user), content_type='application/json')
        db_user = db.session.query(m.User).filter_by(username='chs').first()
        self.assertIsNotNone(db_user)

        user_login = {'email': 'chs@localhost', 'password': 'letmein'}
        response = self.app.post('/auth/login', data=json.dumps(user_login), content_type='application/json')
        self.assertEquals(response.status_code, 200)

    def test_add_room(self):
        room = {'room_name': 'New Room'}
        response = self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        self.assertEquals(response.status_code, 201)
        new_room = db.session.query(m.Room).filter_by(room_name=room['room_name']).first()
        self.assertIsNotNone(new_room)

    def test_get_room(self):
        room = {'room_name': 'New Room'}
        prev_response = self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        self.assertEquals(prev_response.status_code, 201)
        response = self.app.get('/api/room/1')
        self.assertEquals(response.status_code, 200)

    def test_get_all_rooms(self):
        room_1 = {'room_name': 'New Room 1'}
        room_2 = {'room_name': 'New Room 2'}
        res1 = self.app.post('/api/room', data=json.dumps(room_1), content_type='application/json')
        res2 = self.app.post('/api/room', data=json.dumps(room_2), content_type='application/json')
        self.assertEquals(res1.status_code, 201)
        self.assertEquals(res2.status_code, 201)

        res = self.app.get('/api/room')
        self.assertEquals(res.status_code, 200)
        data = ast.literal_eval(res.data.decode('UTF-8'))
        self.assertEquals(len(data['rooms']), 2)

    def test_delete_room(self):
        room_1 = {'room_name': 'New Room 1'}
        room_2 = {'room_name': 'New Room 2'}
        res1 = self.app.post('/api/room', data=json.dumps(room_1), content_type='application/json')
        res2 = self.app.post('/api/room', data=json.dumps(room_2), content_type='application/json')
        self.assertEquals(res1.status_code, 201)
        self.assertEquals(res2.status_code, 201)

        res = self.app.get('/api/room')
        self.assertEquals(res.status_code, 200)
        data = ast.literal_eval(res.data.decode('UTF-8'))
        self.assertEquals(len(data['rooms']), 2)

        self.app.delete('/api/room/1')
        res = self.app.get('/api/room')
        self.assertEquals(res.status_code, 200)
        data = ast.literal_eval(res.data.decode('UTF-8'))
        self.assertEquals(len(data['rooms']), 1)

    def test_add_device(self):
        room = {'room_name': 'New Room'}
        self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        device = {'device_name': 'New Device', 'rated_power': 40, 'room_id': 1}
        response = self.app.post('/api/device/tv', data=json.dumps(device), content_type='application/json')
        self.assertEquals(response.status_code, 201)
        new_device = db.session.query(m.Devices).filter_by(device_name=device['device_name']).first()
        self.assertIsNotNone(new_device)

    def test_get_devices(self):
        room = {'room_name': 'New Room'}
        self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        device_1 = {'device_name': 'New Device 1', 'rated_power': 40, 'room_id': 1}
        device_2 = {'device_name': 'New Device 2', 'rated_power': 40, 'room_id': 1}
        self.app.post('/api/device/tv', data=json.dumps(device_1), content_type='application/json')
        self.app.post('/api/device/tv', data=json.dumps(device_2), content_type='application/json')
        res = self.app.get('/api/device')
        self.assertEquals(res.status_code, 200)

    def test_get_device(self):
        room = {'room_name': 'New Room'}
        self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        device = {'device_name': 'New Device', 'rated_power': 40, 'room_id': 1}
        self.app.post('/api/device/tv', data=json.dumps(device), content_type='application/json')
        res = self.app.get('/api/device/1')
        self.assertEquals(res.status_code, 200)

    def test_change_device(self):
        room = {'room_name': 'New Room'}
        self.app.post('/api/room', data=json.dumps(room), content_type='application/json')
        device = {'device_name': 'New Device', 'rated_power': 40, 'room_id': 1}
        self.app.post('/api/device/tv', data=json.dumps(device), content_type='application/json')
        new_data = {'device_name': 'New Device Name!'}
        self.app.put('/api/device/1', data=json.dumps(new_data),
                     content_type='application/json')
        new_name = db.session.query(m.Devices).filter_by(device_name='New Device Name!').first()
        self.assertIsNotNone(new_name)

    def test_get_device_table_name(self):
        self.assertEquals(r.get_device_table_name('light'), m.Lights)
        self.assertEquals(r.get_device_table_name('tv'), m.TV)
        self.assertEquals(r.get_device_table_name('plug'), m.Plug)
        self.assertEquals(r.get_device_table_name('thermostat'), m.Thermostat)
        self.assertEquals(r.get_device_table_name('solar'), m.Solar)

    def test_get_device_model(self):
        self.assertEquals(s.get_device_model('lights'), s.LightSchema)
        self.assertEquals(s.get_device_model('tv'), s.TVSchema)
        self.assertEquals(s.get_device_model('plug'), s.DeviceSchema)
        self.assertEquals(s.get_device_model('thermostat'), s.ThermostatSchema)
        self.assertEquals(s.get_device_model('solar'), s.DeviceSchema)


if __name__ == '__main__':
    unittest.main()
