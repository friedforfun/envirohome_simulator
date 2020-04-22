#!/bin/bash
if grep docker /proc/1/cgroup -qa; then
	DATA_DIR="/usr/src/app/data"
else
	DATA_DIR=$(pwd)
fi

if [ ! -f "$DATA_DIR/household_power_consumption.txt" ]; then
	unzip -p $DATA_DIR/household_power_consumption.zip | tail -n +2 | tac | cut -d\; -f9 >$DATA_DIR/household_power_consumption.txt
	sed -i "/0.000/d" household_power_consumption.txt
fi
