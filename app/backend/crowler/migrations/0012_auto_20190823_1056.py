# Generated by Django 2.2.1 on 2019-08-23 05:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('crowler', '0011_notificationmodel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notificationmodel',
            old_name='action_done',
            new_name='action_is',
        ),
        migrations.AddField(
            model_name='notificationmodel',
            name='resposive_person',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
