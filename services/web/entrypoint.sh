#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."
    # check that postgres is running and healthy before creating database
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# run test suite
nose2

# generate seed values for device usage stream
./data/get_data.sh

# start celery worker to async publish to device usage streams
celery -A project.tasks.celery worker --loglevel=info &

# create and seed test database
python manage.py create_db 
python manage.py seed_db

# start usage streams
python manage.py start_usage_second
python manage.py start_usage_minute
python manage.py start_usage_hour

exec "$@"
