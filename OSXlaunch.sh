#!/bin/sh

if [ $# -eq 0 ]
  then
    echo "No arguments supplied, attempting to automate. please provide your docker-machines ip address as an argument next time."
    
    export HOST_IP=$(docker-machine ip) 
    ##export HOST_IP=$(ifconfig $(ip route show | grep ^default | cut -d" " -f5) | grep inet[^0-9] | tr -s ' ' | cut -d" " -f3)
  else
    export HOST_IP="$1"
fi

sed -i '' -e "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
sed -i '' -e "s/HOST_IP=.*/HOST_IP=$HOST_IP/" services/frontend/mobile/.env
exec docker-compose build
