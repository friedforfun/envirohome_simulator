#!/bin/sh
export HOST_IP=$(ip -oneline -family inet address | awk '!/127.0.0.1/{print substr($4, 1, length($4)-3)}' | head --lines=1)
sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" services/frontend/mobile/.env
exec docker-compose build
