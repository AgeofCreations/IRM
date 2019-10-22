from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from allauth.account.models import EmailAddress
import random
Account = get_user_model()


class Command(BaseCommand):

    def handle(self, *args, **options):
        if Account.objects.count() == 0:
            username = 'admin'
            email = 'admin@service.ru'
            password = f'a{random.randint(1,30)}dm{random.randint(1,30)}i{random.randint(1,30)}n'
            print('Создание аккаунта для %s (%s), Пароль: %s. Не забудьте изменить его.' % (username, email, password))
            admin = Account.objects.create_superuser(email=email, username=username, password=password)
            admin.is_active = True
            admin.is_admin = True
            admin.save()
            email_addr = EmailAddress(user=admin, email=email, verified=True, primary=True)
            email_addr.save()
        else:
            print('Аккаунт администратора может быть автоматически создан только если не существует других аккаунтов.')

            