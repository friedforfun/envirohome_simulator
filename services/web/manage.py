## @package manage.py
#
# \brief     
# \details   
# \author    Tannick Rose
# \version   1.0
# \date      2020
# \bug       
# \copyright MIT License.
#

#!/usr/bin/env python3
# services/users/manage.py
from flask.cli import FlaskGroup
from project import app, db
from project.models import User


cli = FlaskGroup(app)

# Create command at CLI to create and apply new database model
@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(username="admin", email="nobody@nowhere.address",
                        password_hash="totally a real hash"))
    db.session.commit()


# flaskgroup instance to exend the normal cli with flask commands
if __name__ == "__main__":
    cli()
