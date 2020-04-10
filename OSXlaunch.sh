#!/bin/sh
export HOST_IP=$(ifconfig  $(route | awk '/default/{print $NF}') | awk '/inet[^0-9]/{print $2}')
sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
exec docker-compose build
