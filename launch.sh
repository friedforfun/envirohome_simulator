#!/bin/sh
if [ $# -eq 0 ]
  then
    echo "No arguments supplied, attempting to automate. please provide your machines ip address as an argument if this doesnt work..."
    export HOST_IP=$(ip -oneline -family inet address | awk '!/127.0.0.1/{print substr($4, 1, length($4)-3)}' | head --lines=1)
  else
    export HOST_IP="$1"
fi

sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
sed -i "s/HOST_IP=.*/HOST_IP=$HOST_IP/" services/frontend/mobile/.env
exec docker-compose build
