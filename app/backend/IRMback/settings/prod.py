from .base import *
from celery.schedules import crontab   


DEBUG = False

ALLOWED_HOSTS = ['*']

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'marketing',                      # Or path to database file if using sqlite3.
        'USER': 'age',                      # Not used with sqlite3.
        'PASSWORD': 'admin',                  # Not used with sqlite3.
        'HOST': '10.30.37.65',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '5432',                      # Set to empty string for default. Not used with sqlite3.
		}
    }

CELERY_BROKER_URL = "amqp://rabbitmq"
CELERY_BROKER_USER = "guest"
CELERY_BROKER_PASSWORD = "guest"
CELERY_BROKER_VHOST = "/"
TIME_ZONE = 'Asia/Yekaterinburg'
# Let's make things happen 
CELERY_BEAT_SCHEDULE = {
    'parse-categories': { 
        'task': 'crowler.tasks.category_parsing_task', 
        'schedule': crontab(minute=30, hour=8, day_of_week=2),
    },   
    'parse-filterpages': { 
         'task': 'crowler.tasks.filterpage_parsing_task', 
         'schedule': crontab(minute=30, hour=9, day_of_week=2),
        },          
}