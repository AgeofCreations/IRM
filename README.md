Убедиться, что строка #6 в **app/backend/IRMback/celery.py** это:

`os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IRMback.settings.prod')`



Убедиться, что строка #8 в **app/backend/manage.py** это:

`os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IRMback.settings.prod')`

#### Далее

`docker-compose build`
`docker-compose run`


Найти в выводе строку с `Создание аккаунта для admin (admin@service.ru), Пароль: {password}. Не забудьте изменить его.`
и скопировать автоген пароль.
В админке присвоить созданной учётной записи автоматически созданные группы.
