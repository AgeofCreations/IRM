from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from api import tasks

from .serializers import UserModelSerializer
from allauth.account.models import EmailAddress

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class EmailVerification(CreateModelMixin, GenericViewSet):
    queryset = UserModel
    serializer_class = UserModelSerializer
    def update(self, request, *args, **kwargs):
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        for group in user_groups:
            if str(group) == 'admin':
                verificating_user = self.request.data['verificating_user']
                verificating_user_id = UserModel.objects.get(username=verificating_user).id
                tasks.user_verification.delay(user_id, verificating_user_id, action)                    
                flag = True
        
        if flag == True:
            return Response('Данные пользователя обновлены.')
        else:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)


        