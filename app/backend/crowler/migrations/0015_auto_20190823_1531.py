# Generated by Django 2.2.1 on 2019-08-23 10:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('crowler', '0014_auto_20190823_1133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notificationmodel',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='notificationmodel',
            name='is_read',
        ),
        migrations.AddField(
            model_name='notificationmodel',
            name='is_actual',
            field=models.ManyToManyField(blank=True, related_name='is_actual', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notificationmodel',
            name='not_read',
            field=models.ManyToManyField(blank=True, related_name='not_read', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_data_updated',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_is_season',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_lvl',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_parent_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_path',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_seo_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlercategorymodel',
            name='category_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_created_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_data_updated',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_disabling_reason',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_h1',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_is_active_changed_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_is_top',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='crowlerfilterpagemodel',
            name='filterpage_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='changed_fields',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_is_season',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_lvl',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_parent_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_path',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_seo_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='new_category_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_is_season',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_lvl',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_parent_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_path',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_seo_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitecategorychanges',
            name='old_category_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='changed_fields',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='filterpage_data_changed',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_created_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_disabling_reason',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_h1',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_is_active_changed_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_is_top',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='new_filterpage_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_canonical_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_created_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_disabling_reason',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_full_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_h1',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_has_robots_nofollow',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_has_robots_noindex',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_is_active',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_is_active_changed_at',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_is_top',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_name',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sitefilterpagechanges',
            name='old_filterpage_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]