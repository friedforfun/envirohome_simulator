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
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . ./
RUN apk add dos2unix && dos2unix ./entrypoint.sh

# run entrypoint.sh
RUN chmod a+x ./data/get_data.sh ; chmod 755 entrypoint.sh

# ENTRYPOINT ["./entrypoint.sh"]