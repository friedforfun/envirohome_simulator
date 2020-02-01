## @package init.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug       
# \copyright MIT License.
#

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# from passlib.apps import custom_app_context as pwd_context
app = Flask(__name__)

# Pull the config in init
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

from project import routes, models

