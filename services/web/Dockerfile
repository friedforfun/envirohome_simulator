# pull official base image
FROM python:3.8.0-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
# COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

RUN /bin/sh

# copy project
COPY . /usr/src/app/
RUN apk add dos2unix && dos2unix /usr/src/app/entrypoint.sh

# run entrypoint.sh
RUN chmod 755 entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]