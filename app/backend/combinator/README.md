Убедиться, что строка #6 в `app/backend/IRMback/celery.py` это:

`os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IRMback.settings.prod')`



Убедиться, что строка #8 в `app/backend/manage.py` это:

`os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IRMback.settings.prod')`