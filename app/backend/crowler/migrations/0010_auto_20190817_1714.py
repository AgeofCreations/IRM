# Generated by Django 2.2.1 on 2019-08-17 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crowler', '0009_auto_20190817_0940'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_base_url',
        ),
        migrations.RemoveField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_base_url',
        ),
        migrations.RemoveField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_base_url',
        ),
        migrations.AddField(
            model_name='sitecategorychanges',
            name='changed_fields',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='sitefilterpagechanges',
            name='changed_fields',
            field=models.TextField(null=True),
        ),
    ]