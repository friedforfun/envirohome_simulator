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
awk -F"/" '{print $2"/"$1"/"$3}' last_week.txt > tmp && mv tmp last_week.txt

# split data up into 3 (household_power_consumption.txt has three columns worth of data
mockdatadir="../services/web/mock_data"
echo "device_id;date;time;energy_used" | tee $mockdatadir/dev_1.txt $mockdatadir/dev_2.txt $mockdatadir/dev_3.txt >/dev/null
awk -F';' '{print "0;"$1";"$2";"$NF}' last_week.txt >> $mockdatadir/dev_1.txt
awk -F';' '{print "1;"$1";"$2";"$(NF-1)}' last_week.txt >> $mockdatadir/dev_2.txt
awk -F';' '{print "2;"$1";"$2";"$(NF-2)}' last_week.txt >> $mockdatadir/dev_3.txt

rm last_week.txt household_power_consumption.txt
