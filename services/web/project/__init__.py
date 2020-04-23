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
    'project.tasks',  # where to find celery async tasks
]


def create_celery_app(app):
    ''' create celery app using factory pattern
    app: Flask
    return: Celery
    '''
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

# initalise flask app
app = Flask(__name__)

# load config object from config.py
app.config.from_object('project.config.Config')

# initialise db
db = SQLAlchemy(app)
CORS(app)

from project import routes, models
