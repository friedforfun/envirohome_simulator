#!/bin/sh
export HOST_IP=$(ifconfig | grep inet | grep -v -e 'inet6'  -e '127.0.0.1' | awk '{print $2}' | tail --lines=1)
sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
exec docker-compose build
