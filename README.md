# envirohome_simulator												{#mainpage}
This is the simulator module for Envirohome. Envirohome is a smart home system to allow you to control all of your smart devices in a
easy to use and attractive interface.

### Usage
To build this project:
1. From project root directory run -
`$ docker-compose build`

To run this project:
1. From project root directory run -
`$ docker-compose up -d`
2. In browser navigate to:
__[http://localhost:5000/](http://localhost:5000/)__ or __[http://127.0.0.1:5000/](http://127.0.0.1:5000/)__

### Requirements:
Docker and docker-compose must be installed

1. __[Install docker](https://docs.docker.com/install/)__ - navigate to your Operating System and follow instructions
2. __[Install docker-compose](https://docs.docker.com/compose/install/)__ - Same as above, find OS and follow instructions

### API routes:

__/login__ - Method: `[POST]`
parses JSON:- username, password

__/register__ - Method: `[POST]`
parses JSON:- username, email, password

__/api/floorplan__ - Method `[GET]`
returns floorplan.png image

__/api/devices__ - Method `[GET]`
returns JSON:- devicename, deviceroom, devicestatus

### Useful commands:
#### Custom CLI command:
Example of running custom CLI command create_db (look inside services/web/manage.py):
`$ docker-compose exec web python manage.py create_db`
Run seed_db to populate db (both create_db and seed_db are managed by entrypoint.sh)
`$ docker-compose exec web python manage.py seed_db`

#### Some postgres stuff:

	// shell command to open connection to db
	$ docker-compose exec db psql --username=envirohome_db --dbname=envirohome_db_dev

	psql (12.0)
	Type "help" for help.

	// List databases
	envirohome_db_dev=# \l
	                                        List of databases
	      Name       |    Owner    | Encoding |  Collate   |   Ctype    |      Access privileges
	-----------------+-------------+----------+------------+------------+-----------------------------
	 envirohome_db_dev | envirohome_db | UTF8     | en_US.utf8 | en_US.utf8 |
	 postgres        | envirohome_db | UTF8     | en_US.utf8 | en_US.utf8 |
	 template0       | envirohome_db | UTF8     | en_US.utf8 | en_US.utf8 | =c/envirohome_db             +
	                 |             |          |            |            | envirohome_db=CTc/envirohome_db
	 template1       | envirohome_db | UTF8     | en_US.utf8 | en_US.utf8 | =c/envirohome_db             +
	                 |             |          |            |            | envirohome_db=CTc/envirohome_db
	(4 rows)

	// Select database
	envirohome_db_dev=# \c envirohome_db_dev
	You are now connected to database "envirohome_db_dev" as user "envirohome_db".

	// View database relations
	envirohome_db_dev=# \dt
	          List of relations
	 Schema | Name | Type  |    Owner
	--------+------+-------+-------------
	 public | user | table | envirohome_db
	(1 row)

	// Run basic sql here (for testing only)
	envirohome_db_dev=# select * from users;
	 id | username |         email          |    password_hash    | active
	----+----------+------------------------+---------------------+--------
	  1 | admin    | nobody@nowhere.address | totally a real hash | t
	(1 row)

	// Quit database
	envirohome_db_dev=# \q

### Contributing
#### Comments
	To add comments so that they can be read by the documentation tool Doxygen, use the following format (Python):


				## @package pyexample
				#  Documentation for this module.
				#
				#  More details.

				## Documentation for a function.
				#
				#  More details.
				def func():
					pass

				## Documentation for a class.
				#
				#  More details.
				class PyClass:

					## The constructor.
					def __init__(self):
						self._memVar = 0;

					## Documentation for a method.
					#  @param self The object pointer.
					def PyMethod(self):
						pass

					## A class variable.
					classVar = 0;

					## @var _memVar
					#  a member variable

Special commands can be used within comment blocks to automatically document certain areas of code. Use a backslash (\) for these special commands.

For example:

				## @package init.py
				#
				# \brief     briefly describe the file / method / class, etc
				# \details   add further details here
				# \author    Tannick Rose
				# \version   version number
				# \date      2020
				# \bug       
				# \copyright MIT License.
				#


To contribute to this project:

1. Clone the repo locally
2. Commit  your  code to a separate branch 
3. Open a pull request.

### Frequently Asked Questions and Troubleshooting
See our __[troubleshooting guide](Troubleshooting.md)__ to find answers to some common questions about the project, as well as some ideas to troubleshoot any problems.

### Support
Major versions of this project are supported for six months from the date of release. The table below outlines the end of support dates for all
major versions, and the last minor version for each version.

Major Version	|	Last Minor Version	|	End of Support Date
---------------	|	-------------------	|	-------------------
1				|	1.0					|	N/A

If you are opening an issue for this project, please mention the version which the issue relates to.

### License
Developed under the MIT License.

Copyright (c) 2020 Tanich Rose

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
