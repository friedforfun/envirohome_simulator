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

sh ./data/get_data.sh

celery -A project.tasks.celery worker --loglevel=info &
python manage.py create_db 
python manage.py seed_db

exec "$@"
