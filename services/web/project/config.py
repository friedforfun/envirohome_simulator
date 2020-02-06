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
