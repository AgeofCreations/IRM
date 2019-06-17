from rest_framework import serializers

from combinator.models import CombinatorCols

class CombinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombinatorCols
        fields = ('first_column', 'second_column', 'third_column', 'fourth_column', 'fifth_column', 'sixth_column', 'seventh_column',
             'eighth_column', 'result', 'account_owner', 'operation_datetime')