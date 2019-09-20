# Generated by Django 2.2.1 on 2019-08-22 11:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('crowler', '0010_auto_20190817_1714'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotificationModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_id', models.IntegerField(null=True)),
                ('filterpage_id', models.IntegerField(null=True)),
                ('action_done', models.CharField(max_length=240)),
                ('action_subjects', models.TextField(null=True)),
                ('is_read', models.BooleanField(default=False)),
                ('is_deleted', models.BooleanField(default=False)),
                ('action_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]