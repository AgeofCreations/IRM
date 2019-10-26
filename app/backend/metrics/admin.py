from django.contrib import admin
from metrics.models import (Month, MetricsToken, MetricsCategories, Week)
# Register your models here.

@admin.register(Month)
class MonthAdmin(admin.ModelAdmin):
    list_display = ('name', 'year' )


@admin.register(MetricsToken)
class MetricsTokenAdmin(admin.ModelAdmin):
    list_display = ('related_user', 'token')

@admin.register(Week)
class WeekAdmin(admin.ModelAdmin):
    list_display = ('first_day',)

@admin.register(MetricsCategories)
class MetricsCategoriesAdmin(admin.ModelAdmin):
    list_display = ('__str__', )

# @admin.register(MetricsOldData)
# class MetricsOldDataAdmin(admin.ModelAdmin):
#     list_display = ('old_name', 'old_year' )
