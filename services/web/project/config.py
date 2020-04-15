## @package config.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \copyright MIT License.
#

import os


basedir = os.path.abspath(os.path.dirname(__file__))

## \brief Get database URL
#
# Get database URL from the environment variable defined in .env.dev file
class Config(object):
    ## \brief Get database URL
    #
    #
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")

    ## \brief Track the modifications
    #
    #
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    ## \brief Secret key for signing JWT tokens
    #
    #
    SECRET_KEY = 'mMUsP5arT3x3BQxYuKWQhhN5HytX3t'

    base_url = os.getenv('HOST_IP', 'localhost')
    CELERY_BROKER_URL = 'redis://{}:6379/0'.format(base_url)

    CELERY_RESULT_BACKEND = 'redis://{}:6379/0'.format(base_url)
