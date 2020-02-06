from project import app, db
from project.models import User, Usage, Devices
from project.routes import get_usage
import unittest
import json


class TestStringMethods(unittest.TestCase):
    def test_get_usage(self):
        json_api = get_usage(1, '30012020', '00:37:00')
        with app.app_context():
            json_real = json.load('[ { "date": "2020-01-30", "device_id": 1, "energy_usage": 0.0, "time": "00:37:00" } ]')

        self.assertEqual(json_api, json_real)


if __name__ == '__main__':
    unittest.main()
