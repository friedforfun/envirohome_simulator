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
