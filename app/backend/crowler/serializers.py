from rest_framework import serializers

<<<<<<< HEAD
from .models import (CrowlerCategoryModel, CrowlerFilterPageModel,
 SiteCategoryChanges, SiteFilterpageChanges,
  NotificationModel, Responsibilities, Categories)
=======
from .models import CrowlerCategoryModel, CrowlerFilterPageModel, SiteCategoryChanges, SiteFilterpageChanges
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645

class CrowlerCategorySerizalizer(serializers.ModelSerializer):
    class Meta:
        model = CrowlerCategoryModel
        fields = ('category_id', 'category_name',
         'category_path', 'category_lvl', 'category_url',
         'category_parent_id', 'category_title',
         'category_description', 'category_full_name',
         'category_has_robots_nofollow', 'category_has_robots_noindex',
         'category_canonical_url', 'category_is_active',
         'category_is_season', 'category_seo_text',
         'category_data_updated')
<<<<<<< HEAD
=======

class CrowlerFilterpageSerizalizer(serializers.ModelSerializer):
    class Meta:
        model = CrowlerFilterPageModel
        fields = ('filterpage_id', 'filterpage_url',
         'filterpage_title', 'filterpage_description', 'filterpage_text',
         'filterpage_name', 'filterpage_full_name',
         'filterpage_is_active', 'filterpage_disabling_reason',
         'filterpage_has_robots_nofollow', 'filterpage_has_robots_noindex',
         'filterpage_canonical_url', 'filterpage_is_top',
         'filterpage_is_active_changed_at', 'filterpage_created_at',
         'filterpage_h1', 'filterpage_data_updated')

class CategoryChangesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteCategoryChanges
        fields = ('category_id', 'old_category_name',
         'old_category_path', 'old_category_lvl', 'old_category_url',
         'old_category_parent_id', 'old_category_title',
         'old_category_description', 'old_category_full_name',
         'old_category_has_robots_nofollow', 'old_category_has_robots_noindex',
         'old_category_canonical_url', 'old_category_is_active',
         'old_category_is_season', 'old_category_seo_text',
         'new_category_name',
         'new_category_path', 'new_category_lvl', 'new_category_url',
         'new_category_parent_id', 'new_category_title',
         'new_category_description', 'new_category_full_name',
         'new_category_has_robots_nofollow', 'new_category_has_robots_noindex',
         'new_category_canonical_url', 'new_category_is_active',
         'new_category_is_season', 'new_category_seo_text', 'new_changed_fields')
         
class FilterpageChangesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteFilterpageChanges
        fields = ('filterpage_id', 'old_filterpage_url',
         'old_filterpage_title', 'old_filterpage_description', 'old_filterpage_text',
         'old_filterpage_name', 'old_filterpage_full_name',
         'old_filterpage_is_active', 'old_filterpage_disabling_reason',
         'old_filterpage_has_robots_nofollow', 'old_filterpage_has_robots_noindex',
         'old_filterpage_canonical_url', 'old_filterpage_is_top',
         'old_filterpage_is_active_changed_at', 'old_filterpage_created_at',
         'old_filterpage_h1', #
         'new_filterpage_title', 'new_filterpage_description', 'new_filterpage_text',
         'new_filterpage_name', 'new_filterpage_full_name',
         'new_filterpage_is_active', 'new_filterpage_disabling_reason',
         'new_filterpage_has_robots_nofollow', 'new_filterpage_has_robots_noindex',
         'new_filterpage_canonical_url', 'new_filterpage_is_top',
         'new_filterpage_is_active_changed_at', 'new_filterpage_created_at',
         'new_filterpage_h1', 'changed_fields', 'filterpage_data_changed')
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645

class CrowlerFilterpageSerizalizer(serializers.ModelSerializer):
    class Meta:
        model = CrowlerFilterPageModel
        fields = ('__all__')

class CategoryChangesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteCategoryChanges
        fields = ('__all__')
         
class FilterpageChangesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteFilterpageChanges
        fields = ('__all__')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationModel
        fields = ('__all__')

class ResponsibilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibilities
        fields = ('__all__')
        
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('__all__')