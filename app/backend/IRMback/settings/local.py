from .base import *


DEBUG = True

ALLOWED_HOSTS = '*'

INSTALLED_APPS += [
    'django_extensions'
]
#a30dm16i21n
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'postgres',                      # Or path to database file if using sqlite3.
        'USER': 'age',                      # Not used with sqlite3.
        'PASSWORD': 'admin',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '5432',                      # Set to empty string for default. Not used with sqlite3.
		}
    }
CELERY_BROKER_URL = 'amqp://localhost:5672/'
CELERY_BROKER_USER = "ageofcreations"
CELERY_BROKER_PASSWORD = "soletstry"
CELERY_BROKER_VHOST = "/"
