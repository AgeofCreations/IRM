# Generated by Django 2.2.1 on 2019-08-17 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crowler', '0008_crowlerfilterpagemodel_sitefilterpagechanges'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sitefilterpagechanges',
            old_name='new_filterpage_data_updated',
            new_name='filterpage_data_changed',
        ),
    ]