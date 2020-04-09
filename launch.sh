#!/bin/sh
export HOST_IP=$(hostname --ip-address | cut -d" " -f1)
exec docker-compose build
