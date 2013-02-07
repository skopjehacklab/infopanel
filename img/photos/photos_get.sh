#!/bin/bash

wget -q https://georgi.softver.org.mk/blog/datoteki/2cmk/infopanel/photos_url.txt -O photos_url.txt

if [ $? -ne "0" ]; then
    exit $?
fi

while read url; do
    file=`basename "$url"`
    if [ ! -f "$file" ]; then
       wget -q "$url" -O "$file"
    fi
done < photos_url.txt

