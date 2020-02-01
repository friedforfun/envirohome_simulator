#!/bin/sh

if [ ! -f "household_power_consumption.txt" ]; then
	unzip household_power_consumption.zip
fi

# grab last week worth of data
tail -n +2066798 household_power_consumption.txt > last_week.txt

# bring data into the modern age
sed -i 's/2010/2020/' last_week.txt
sed -i 's/\/11\//\/01\//' last_week.txt
awk -F'/' '{print ($1 + 4)"/"$2"/"$3}' last_week.txt > tmp && mv tmp last_week.txt

# americani(z|s)e the date for gnu date
# awk -F"/" '{print $2"/"$1"/"$3}' last_week.txt > tmp && mv tmp last_week.txt

# split data up into 3 (household_power_consumption.txt has three columns worth of data
awk -F';' '{print $1";"$2";"$NF}' last_week.txt > dev_1.txt
awk -F';' '{print $1";"$2";"$(NF-1)}' last_week.txt > dev_2.txt
awk -F';' '{print $1";"$2";"$(NF-2)}' last_week.txt > dev_3.txt



