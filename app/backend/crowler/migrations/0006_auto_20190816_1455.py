# Generated by Django 2.2.1 on 2019-08-16 09:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crowler', '0005_auto_20190816_1444'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sitecategorychanges',
            old_name='new_category_data_updated',
            new_name='category_data_changed',
        ),
        migrations.RemoveField(
            model_name='sitecategorychanges',
            name='old_category_data_updated',
        ),
    ]