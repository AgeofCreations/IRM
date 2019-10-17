from rest_framework import serializers

from django.contrib.auth import get_user_model
UserModel = get_user_model()



class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'groups')
        read_only_fields = ('email', 'groups' )
        




