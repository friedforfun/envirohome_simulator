## @package init.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020 
# \copyright MIT License.
#

from flask import Flask, jsonify
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

CELERY_TASK_LIST = [
    'project.tasks',
]


def create_celery_app(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'],
                    include=CELERY_TASK_LIST,
                    backend=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


## \brief from passlib.apps import custom_app_context as pwd_context
#
#
app = Flask(__name__)

## \brief Pull the config in init
#
#
app.config.from_object("project.config.Config")

db = SQLAlchemy(app)
CORS(app)

from project import routes, models
