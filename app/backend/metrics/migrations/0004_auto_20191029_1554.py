# Generated by Django 2.2.1 on 2019-10-29 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metrics', '0003_auto_20191029_1549'),
    ]

    operations = [
        migrations.RenameField(
            model_name='month',
            old_name='monthly_prev',
            new_name='monthly_target',
        ),
        migrations.RenameField(
            model_name='month',
            old_name='monthly_multiplication_percentage',
            new_name='site_multiplication_percentage',
        ),
        migrations.RenameField(
            model_name='month',
            old_name='site_target',
            new_name='site_prev',
        ),
    ]
