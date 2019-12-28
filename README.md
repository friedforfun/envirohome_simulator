# envirohome_simulator
Simulator module for Envirohome

###Requirements:
Docker must be installed

__[Install docker](https://docs.docker.com/install/)__ - navigate to your Operating System and follow instructions

###Build instructions:

1. From project root directory run - 
`$ docker-compose build`

###Run instructions:

1. From project root directory run - 
`$ docker-compose up -d`
2. In browser navigate to:
__[http://localhost:5000/](http://localhost:5000/)__ or __[http://127.0.0.1:5000/](http://127.0.0.1:5000/)__


###Troubleshooting:

First steps:
1. Remove container and volumes - 
`$ docker-compose down -v`
2. Rebuild container: from project root directory run - 
`$ docker-compose build`


###Useful commands:
call create_db CLI command inside manage.py file:
`$ docker-compose exec web python manage.py create_db`

Some postgres stuff:

	// shell command to open connection to db
	$ docker-compose exec db psql --username=envirohome_db --dbname=envirohome_db_dev

	psql (12.0)
	Type "help" for help.

	//list databases
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

	// Select table
	envirohome_db_dev=# \c envirohome_db_dev
	You are now connected to database "envirohome_db_dev" as user "envirohome_db".

	// View table relations
	envirohome_db_dev=# \dt
	          List of relations
	 Schema | Name | Type  |    Owner
	--------+------+-------+-------------
	 public | user | table | envirohome_db
	(1 row)

	// Quit
	envirohome_db_dev=# \q