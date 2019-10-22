from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not Group.objects.filter(name = 'admin').exists():
            q = Group(pk=1, name='seo')
            q.save()
            q = Group (pk=2, name='admin')
            q.save()
            print('Основные группы созданы')
        else: print('Основные группы уже существуют')
