# Generated by Django 2.2.1 on 2019-08-16 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crowler', '0006_auto_20190816_1455'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_canonical_url',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_data_updated',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_full_name',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_has_robots_nofollow',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_has_robots_noindex',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_is_active',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_is_season',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_lvl',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_name',
            field=models.CharField(max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_parent_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_path',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_seo_text',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_title',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_url',
            field=models.CharField(max_length=500, null=True),
        ),
    ]