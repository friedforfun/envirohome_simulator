#!/bin/sh
export HOST_IP=$(hostname --ip-address | cut -d" " -f1)
sed -i "s/HOST_IP=127.0.0.1/HOST_IP=$HOST_IP/" .env.dev
exec docker-compose build
