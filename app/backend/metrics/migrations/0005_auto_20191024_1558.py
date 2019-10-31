# Generated by Django 2.2.1 on 2019-10-24 10:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metrics', '0004_auto_20191024_1542'),
    ]

    operations = [
        migrations.AddField(
            model_name='week',
            name='category',
            field=models.ManyToManyField(to='metrics.MetricsCategories'),
        ),
        migrations.AlterField(
            model_name='week',
            name='month',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metrics.Month'),
        ),
    ]
