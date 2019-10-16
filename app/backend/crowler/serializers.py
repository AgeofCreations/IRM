from rest_framework import serializers

from .models import (CrowlerCategoryModel, CrowlerFilterPageModel,
 SiteCategoryChanges, SiteFilterpageChanges,
  NotificationModel, Responsibilities, Categories)

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

        
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('__all__')
        
class ResponsibilitiesSerializer(serializers.ModelSerializer):
    categories = CategoriesSerializer(source='responsibilities', read_only=True, many=True)
    class Meta:
        model = Responsibilities
        fields = ('__all__', 'responsibilities')