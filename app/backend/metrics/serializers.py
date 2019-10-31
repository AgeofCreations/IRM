from rest_framework import serializers

from .models import (Month, Week, MetricsCategories,
                    CategoriesData, MetricsToken, ThirdLevelCategoriesData,
                    ThirdLevelCategories, ThirdLevelWeeks)


class ThirdLevelWeeksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdLevelWeeks
        fields= ('__all__')

class ThirdLevelCategoriesDataSerializer(serializers.ModelSerializer):
    weeks = ThirdLevelWeeksSerializer(many=True, read_only=True)
    class Meta: 
        model = ThirdLevelCategoriesData
        fields = ['month_category', 'child_category', 'child_category_traffic', 'weeks']


class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Month
        fields = ('__all__')

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = ('__all__')

class MetricsCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricsCategories
        fields = ('__all__')

class CategoriesDataSerializer(serializers.ModelSerializer):
    third_level = ThirdLevelCategoriesDataSerializer(many=True)
    class Meta:
        model = CategoriesData
        fields = ['month', 'category_name', 'third_level']

    def create(self, validated_data):
        tracks_data = validated_data.pop('third_level')
        album = CategoriesData.objects.create(**validated_data)
        for track_data in tracks_data:
            ThirdLevelCategoriesData.objects.create(month_category=album, **track_data)
        return album

class MetricsTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricsToken
        fileds = ('__all__')




