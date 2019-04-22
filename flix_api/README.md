# Setting up your virtual environment
# Install virtualenv:
	`pip3 install virtualenv`
	`pip3 install virtualenvwrapper`
If using windows, install
	`pip3 install virtualenvwrapper-win`

Running `which virtualenvwrapper.sh` should return `/usr/local/bin/virtualenvwrapper.sh`

Then add the following to your bash profile:
export WORKON_HOME="~/.virtualenvs"
export VIRTUALENVWRAPPER_PYTHON="/usr/local/bin/python3"
export VIRTUALENVWRAPPER_VIRTUALENV="/usr/local/bin/virtualenv"
source /usr/local/bin/virtualenvwrapper.sh

To activate virtualenv:
Run `workon {virtualenv_name}`
To deactivate, just enter `deactivate`

# Installing Postgres and setting up the DB:
Follow the instructions here for installing postgres for your system as well as setting up the database and connection.

My username is `hunter` and password is `showvies`

# Setting environment variables:
Enter `vi $VIRTUAL_ENV/bin/postactivate`

Then add the following lines:			 						
export DATABASE_NAME=’showvies’
export DATABASE_USER='myusername'

Save and exit

Then enter `vi $VIRTUAL_ENV/bin/predeactivate`

Then add the following lines:
unset DATABASE_NAME
unset DATABASE_USER


# Sync and migrate database:
Run `python manage.py check` -- should return no errors
Run `python manage.py migrate`

Create a superuser:
`python manage.py createsuperuser`



