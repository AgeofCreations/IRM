from rest_framework import serializers

from combinator.models import CombinatorCols
from django.contrib.auth import get_user_model
UserModel = get_user_model()


class CombinatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombinatorCols
        fields = ('pk', 'first_column', 'second_column', 'third_column', 'fourth_column', 'fifth_column', 'sixth_column', 'seventh_column',
             'eighth_column', 'result', 'account_owner')

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'groups')
        read_only_fields = ('email', 'username', 'groups' )
        


