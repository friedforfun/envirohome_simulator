#!/bin/sh
## export HOST_IP=$(ifconfig | grep inet | grep -v -e 'inet6'  -e '127.0.0.1' | awk '{print $2}') 
export HOST_IP=$(ifconfig $(ip route show | grep ^default | cut -d" " -f5) | grep inet[^0-9] | tr -s ' ' | cut -d" " -f3)
sed -i '' -e "s/HOST_IP=.*/HOST_IP=$HOST_IP/" .env
sed -i '' -e "s/HOST_IP=.*/HOST_IP=$HOST_IP/" services/frontend/mobile/.env
exec docker-compose build
