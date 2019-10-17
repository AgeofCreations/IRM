from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters

from django.contrib.auth import get_user_model
UserModel = get_user_model()
from .models import (CrowlerCategoryModel, CrowlerFilterPageModel,
 SiteCategoryChanges, SiteFilterpageChanges,
  NotificationModel, Responsibilities, Categories)
from .serializers import (CrowlerCategorySerizalizer, CrowlerFilterpageSerizalizer,
 CategoryChangesSerializer, FilterpageChangesSerializer,
 NotificationSerializer, ResponsibilitiesSerializer, CategoriesSerializer)
from crowler import tasks





#----------------------------------------------ФИЛЬТРЫ--------------------------------------------
class NotificationsFilter(filters.FilterSet):
    action_is = filters.CharFilter(field_name="action_is", lookup_expr='iexact')
    action_subjects = filters.CharFilter(field_name="action_subjects", lookup_expr='icontains')
    filterpage_id = filters.CharFilter(field_name='filterpage_id', lookup_expr='startswith')
    category_id = filters.CharFilter(field_name='category_id', lookup_expr='startswith')
    

    class Meta:
        model = NotificationModel
        fields = ['is_actual', 'not_read', 'action_is', 'action_subjects', 'filterpage_id', 'category_id']


class CategoryFilter(filters.FilterSet):
    category_url = filters.CharFilter(field_name="category_url", lookup_expr='icontains')
    category_is_active = filters.NumberFilter(field_name="filterpage_is_active", distinct=True)
    category_id = filters.CharFilter(field_name='category_id', lookup_expr='startswith')
    class Meta:
        model = CrowlerCategoryModel
        fields = ['category_url', 'category_is_active', 'category_id']
    
class CategoryChangesFilter(filters.FilterSet):
    changed_fields = filters.CharFilter(field_name="changed_fields", lookup_expr='icontains')
    category_id = filters.CharFilter(field_name='category_id', lookup_expr='startswith')
    class Meta:
        model = SiteCategoryChanges
        fields = ['changed_fields', 'category_id']


class FiterpageFilter(filters.FilterSet):
    filterpage_url = filters.CharFilter(field_name="filterpage_url", lookup_expr='icontains')
    filterpage_created_at = filters.CharFilter(field_name="filterpage_created_at", lookup_expr='icontains')
    filterpage_is_active_changed_at = filters.CharFilter(field_name="filterpage_is_active_changed_at", lookup_expr="isnull")
    filterpage_is_active = filters.NumberFilter(field_name="filterpage_is_active")
    filterpage_id = filters.CharFilter(field_name='filterpage_id', lookup_expr='startswith')

    class Meta:
        model = CrowlerFilterPageModel
        fields = ['filterpage_url', 'filterpage_created_at', 'filterpage_is_active_changed_at', 'filterpage_id']

class FilterpageChangesFilter(filters.FilterSet):
    changed_fields = filters.CharFilter(field_name="changed_fields", lookup_expr='icontains')
    filterpage_id = filters.CharFilter(field_name='filterpage_id', lookup_expr='startswith')
    class Meta:
        model = SiteFilterpageChanges
        fields = ['changed_fields', 'filterpage_id']
#---------------------------------ПАГИНАЦИЯ--------------------------------------------

class CrowlerPagination(PageNumberPagination):
    page_size = 25

#--------------------------------УВЕДОМЛЕНИЯ-----------------------------
class NotificationsList(ListAPIView): #/crowler/notify/ 
    serializer_class = NotificationSerializer
    parser_classes = [JSONParser]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = NotificationsFilter
    pagination_class = CrowlerPagination

    def get_queryset(self):
        user = self.request.user
        queryset = NotificationModel.objects.filter(resposive_person=user)
        return queryset

#----Управление уведомлениями----

class NotificationsUpdate(CreateModelMixin, GenericViewSet):
    queryset = NotificationModel
    serializer_class = NotificationSerializer
    parser_classes = [JSONParser]


    def read_notifications(self, request, *args, **kwargs): #/crowler/notify/read/ 
        notification_id = str(self.request.data['notification_id'])
        user_id = self.request.user.id
        if notification_id == 'all':
            read_all_task = tasks.read_all_notifications.delay(user_id)
        else:
            read_one_task = tasks.read_one_notification.delay(user_id, notification_id)
        return Response('Уведомление помечено как прочитанное')
    
    def delete_notifications(self, request, *args, **kwargs): #/crowler/notify/delete/ 
        notification_id = str(self.request.data['notification_id'])
        user_id = self.request.user.id
        if notification_id == 'all':
            delete_all_task = tasks.delete_all_notifications.delay(user_id)
        else:
            delete_one_task = tasks.delete_one_notification.delay(user_id, notification_id)
        return Response('Уведомление помечено как удалённое')


#----Управление подписками на категории----
class NotificationsSubscription(CreateModelMixin, GenericViewSet):
    queryset = Responsibilities
    serializer_class = CategoriesSerializer
    parser_classes = [JSONParser]

    def subscriptions_list(self, request, *args, **kwargs): #/crowler/notify/subscriptions/
        user_id = self.request.user.id
        user = UserModel.objects.get(id=user_id)
        user_set = user.responsibilities_set.all()
        try:
            responsibilites = user_set[0].responsibilities.all()
        except IndexError:
            model_instance = Responsibilities(person=user)
            model_instance.save()
            user_set = user.responsibilities_set.all()
            responsibilites = user_set[0].responsibilities.all()

        responsibilites_list = []
        for item in responsibilites:
            responsibilites_list.append(str(item))
        return Response(responsibilites_list)

    def update(self, request, *args, **kwargs):
        user_id = self.request.user.id
        user = UserModel.objects.get(id=user_id)
        user_set = user.responsibilities_set.all()
        user_set[0].responsibilities.clear()
        new_responsibilities = self.request.data['responsibilities']
        output_list = []
        for item in new_responsibilities:
            q = Categories.objects.filter(category__startswith=item)
            user_set[0].responsibilities.add(q[0].id)
            output_list.append(str(q[0]))

        return Response(f"Оформлена подписка на категории: {output_list}")
        



class CategoriesList(CreateModelMixin, GenericViewSet): #/crowler/notify/categories/
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    parser_classes = [JSONParser]
    def list(self, request,*args, **kwargs):
        output_list = []
        for item in self.queryset:
            output_list.append(str(item.category))
        
        return Response(output_list)


#----------------------------------------------КАТЕГОРИИ--------------------------------------------

class CategoryListView(ListAPIView): #/crowler/category/ 
    queryset = CrowlerCategoryModel.objects.all().order_by('category_id')
    serializer_class = CrowlerCategorySerizalizer
    parser_classes = [JSONParser]
    pagination_class = CrowlerPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryFilter



class CategoryDetailView(RetrieveAPIView): #/crowler/category/<category_id>/ 
    queryset = CrowlerCategoryModel.objects.all()
    serializer_class = CrowlerCategorySerizalizer
    lookup_field = 'category_id'
    parser_classes = [JSONParser]

class CategoryChangesList(ListAPIView): #/crowler/changes/category/ 
    queryset = SiteCategoryChanges.objects.all()
    serializer_class = CategoryChangesSerializer
    lookup_field = 'category_id'
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryChangesFilter
    parser_classes = [JSONParser]
    pagination_class = CrowlerPagination

class CategoryChangesView(RetrieveAPIView): #/crowler/changes/category/<pk>/ 
    queryset = SiteCategoryChanges.objects.all()
    serializer_class = CategoryChangesSerializer
    parser_classes = [JSONParser]

#----------------------------------------------ПФС--------------------------------------------

class FilterpageListView(ListAPIView): #/crowler/filterpage/ 
    queryset = CrowlerFilterPageModel.objects.all()
    serializer_class = CrowlerFilterpageSerizalizer
    parser_classes = [JSONParser]
    pagination_class = CrowlerPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FiterpageFilter
    
class FilterpageDetailView(RetrieveAPIView): #/crowler/filterpage/<filterpage_id>/ 
    queryset = CrowlerFilterPageModel.objects.all()
    serializer_class = CrowlerFilterpageSerizalizer
    lookup_field = 'filterpage_id'
    parser_classes = [JSONParser]

class FilterpageChangesList(ListAPIView): #/crowler/changes/filterpage/ 
    queryset = SiteFilterpageChanges.objects.all()
    serializer_class = FilterpageChangesSerializer
    lookup_field = 'filterpage_id'
    parser_classes = [JSONParser]
    pagination_class = CrowlerPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FilterpageChangesFilter

class FilterpageChangesView(RetrieveAPIView): #crowler/changes/filterpage/<pk>/
    queryset = SiteFilterpageChanges.objects.all()
    serializer_class = FilterpageChangesSerializer
    parser_classes = [JSONParser]



class CrowlerStart(CreateModelMixin, GenericViewSet): 
    queryset = CrowlerCategoryModel
    serializer_class = CrowlerCategorySerizalizer
    parser_classes = [JSONParser]


    def filterpage(self, request, *args, **kwargs): #/crowler/start/filterpage/ 
        fps_task = tasks.filterpage_parsing_task.delay()
        return Response('Сбор ПФС начат.')
    
    def category(self, request, *args, **kwargs): #/crowler/ start/category/ 
        cat_task = tasks.category_parsing_task.delay() 
        return Response('Сбор категорий начат.')
        
    
    
