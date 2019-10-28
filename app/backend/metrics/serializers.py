from rest_framework import serializers

from .models import Month, Week, MetricsCategories, CategoriesData, MetricsToken

class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Month
        fields = ('__all__')

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = ('__all__')

class CategoriesDataSerializer(serializers.Serializer):
    class Meta:
        model = CategoriesData
        fields = ('__all__')

class MetricsCategoriesSerializer(serializers.Serializer):
    class Meta:
        model = MetricsCategories
        fields = ('__all__')

class MetricsTokenSerializer(serializers.Serializer):
    class Meta:
        model = MetricsToken
        fileds = ('__all__')