# pull official base image
FROM python:3.8.0-alpine

# set work directory
WORKDIR /usr/src/misc

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt ./requirements.txt


# copy project
COPY ./entrypoint.sh ./entrypoint.sh
RUN apk add dos2unix && dos2unix ./entrypoint.sh

WORKDIR /usr/src/app
COPY . .
RUN pip install -r ../misc/requirements.txt
RUN chmod a+x ./data/get_data.sh ; chmod 755 ../misc/entrypoint.sh

ENTRYPOINT ["/usr/src/misc/entrypoint.sh"]