# Generated by Django 2.2.1 on 2019-10-29 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metrics', '0002_auto_20191028_1146'),
    ]

    operations = [
        migrations.RenameField(
            model_name='month',
            old_name='monthly_target',
            new_name='monthly_prev',
        ),
        migrations.AddField(
            model_name='month',
            name='monthly_multiplication_percentage',
            field=models.IntegerField(default=30),
        ),
    ]
