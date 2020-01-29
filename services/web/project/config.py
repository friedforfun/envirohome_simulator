## @package config.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug       
# \copyright MIT License.
#

import os


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # Get database URL from the environment variable defined in .env.dev file
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
