from rest_framework import serializers

from .models import CrowlerCategoryModel

class CrowlerCategoryModel(serializers.ModelSerializer):
    class Meta:
        model = CrowlerCategoryModel
        fields = ('pk', 'category_id', 'category_name', 'category_url', 'category_title', 'category_description', 'has_robots_nofollow', 'has_robots_noindex',
             'canonical_url', 'seo_text', 'account_owner')

