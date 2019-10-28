# Generated by Django 2.2.1 on 2019-10-28 05:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriesData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(blank=True, max_length=250)),
                ('category_plan', models.IntegerField(blank=True, null=True)),
                ('category_factual', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MetricsCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_url', models.CharField(blank=True, max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Month',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, null=True)),
                ('year', models.IntegerField(default=2020)),
                ('monthly_target', models.IntegerField(blank=True, null=True)),
                ('monthly_factual', models.IntegerField(blank=True, null=True)),
                ('month_starts', models.CharField(max_length=250, null=True)),
                ('month_ends', models.CharField(max_length=250, null=True)),
                ('site_target', models.IntegerField(blank=True, null=True)),
                ('site_factual', models.IntegerField(blank=True, null=True)),
                ('is_now', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_day', models.CharField(max_length=250, null=True)),
                ('last_day', models.CharField(max_length=250, null=True)),
                ('weekly_traffic', models.IntegerField(blank=True, null=True)),
                ('in_month', models.IntegerField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metrics.CategoriesData')),
                ('month', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metrics.Month')),
            ],
        ),
        migrations.CreateModel(
            name='MetricsToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(blank=True, max_length=250, null=True)),
                ('related_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='categoriesdata',
            name='month',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='metrics.Month'),
        ),
    ]
