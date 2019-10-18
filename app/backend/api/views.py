from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.generics import ListAPIView
from api import tasks

from .serializers import UserModelSerializer
from allauth.account.models import EmailAddress
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
UserModel = get_user_model()

class EmailVerification(CreateModelMixin, GenericViewSet):
    queryset = UserModel
    serializer_class = UserModelSerializer
    parser_classes = [JSONParser]
    def update(self, request, *args, **kwargs):
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        for group in user_groups:
            if str(group) == 'admin':
                if UserModel.objects.filter(username__iexact=self.request.data['verificating_user']).exists():
                    verificating_user = self.request.data['verificating_user']
                    verificating_user_id = UserModel.objects.get(username=verificating_user).id
                    tasks.user_verification.delay(user_id, verificating_user_id, action)                    
                    flag = True
                else: return Response('Пользователь не существует', status=405)
        
        if flag == True:
            return Response('Данные пользователя обновлены.')
        else:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)

class GroupsView(CreateModelMixin, GenericViewSet):
    queryset = UserModel
    serializer_class = UserModelSerializer
    parser_classes = [JSONParser]
    
    def groups_list(self, request):
        groups = list(Group.objects.all().values_list('name', flat=True))

        return Response(groups)

    def update(self,request, *args, **kwargs):
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        for group in user_groups:
            if str(group) == 'admin':
                if UserModel.objects.filter(username__iexact=self.request.data['updating_user']).exists():
                    groups_to_update = self.request.data['groups_to_update']
                    updating_user = self.request.data['updating_user']
                    updating_user_id = UserModel.objects.get(username=updating_user).id
                    for group_to_update in groups_to_update:
                        tasks.user_group_updating.delay(user_id, updating_user_id, action, group_to_update)                    
                    flag = True
                else: return Response('Пользователь не существует', status=405)
        
        if flag == True:
            return Response('Данные пользователя обновлены.')
        else:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)

        