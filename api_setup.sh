#!/bin/bash
cd flix_api
python manage.py sync
python manage.py runserver
