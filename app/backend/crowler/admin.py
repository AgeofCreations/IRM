from django.contrib import admin
from crowler.models import (CrowlerCategoryModel, SiteCategoryChanges,
 CrowlerFilterPageModel, SiteFilterpageChanges,
  NotificationModel, Responsibilities, Categories)



@admin.register(CrowlerCategoryModel)
class CrowlerCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'category_name', 'category_url', 'category_title', 'category_data_updated')
    list_filter = ('category_data_updated', 'category_is_active', 'category_has_robots_nofollow', 'category_has_robots_noindex')

@admin.register(SiteCategoryChanges)
class CategoryChangesAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'old_category_name', 'category_data_changed' )
    list_filter = ('changed_fields', 'category_data_changed')

@admin.register(CrowlerFilterPageModel)
class CrowlerFilterPageAdmin(admin.ModelAdmin):
    list_display = ('filterpage_id', 'filterpage_name', 'filterpage_url', 'filterpage_title', 'filterpage_data_updated')
    list_filter = ('filterpage_is_active', 'filterpage_data_updated')

@admin.register(SiteFilterpageChanges)
class FilterpageChangesAdmin(admin.ModelAdmin):
    list_display = ('filterpage_id', 'old_filterpage_name', 'filterpage_data_changed', 'changed_fields')
    list_filter = ('changed_fields', 'filterpage_data_changed')

@admin.register(NotificationModel)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'filterpage_id', 'action_is')
    list_filter = ('action_is', 'category_id')
@admin.register(Responsibilities)
class Responsibilities(admin.ModelAdmin):
    list_display = ('person',)
@admin.register(Categories)
class Categories(admin.ModelAdmin):
    list_display = ('category',)

