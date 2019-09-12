from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.pagination import PageNumberPagination#, CursorPagination
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


    class Meta:
        model = NotificationModel
        fields = ['is_actual', 'not_read', 'action_is', 'action_subjects']

class CategoryFilter(filters.FilterSet):
    category_url = filters.CharFilter(field_name="category_url", lookup_expr='icontains')
    category_is_active = filters.NumberFilter(field_name="filterpage_is_active", distinct=True)
    # filterpage_created_at = filters.CharFilter(field_name="filterpage_created_at", lookup_expr='icontains')
    # filterpage_is_active_changed_at = filters.CharFilter(field_name="filterpage_is_active_changed_at", lookup_expr="isnull")
    class Meta:
        model = CrowlerCategoryModel
        fields = ['category_url', 'category_is_active']

class FiterpageFilter(filters.FilterSet):
    filterpage_url = filters.CharFilter(field_name="filterpage_url", lookup_expr='icontains')
    filterpage_created_at = filters.CharFilter(field_name="filterpage_created_at", lookup_expr='icontains')
    filterpage_is_active_changed_at = filters.CharFilter(field_name="filterpage_is_active_changed_at", lookup_expr="isnull")
    filterpage_is_active = filters.NumberFilter(field_name="filterpage_is_active")
    class Meta:
        model = CrowlerFilterPageModel
        fields = ['filterpage_url', 'filterpage_created_at', 'filterpage_is_active_changed_at']

#----------------------------------------------ПАГИНАЦИЯ--------------------------------------------

class CategoryPagination(PageNumberPagination):
    page_size = 25
    ordering = 'category_id' #ordering - для CursorPagination

class FilterpagePagination(PageNumberPagination):
    page_size = 25
    ordering = 'filterpage_id'  

#--------------------------------УВЕДОМЛЕНИЯ-----------------------------
class NotificationsList(ListAPIView):
    # queryset = NotificationModel.objects.all()
    serializer_class = NotificationSerializer
    parser_classes = [JSONParser]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = NotificationsFilter
    pagination_class = CategoryPagination

    def get_queryset(self):
        user = self.request.user
        queryset = NotificationModel.objects.filter(resposive_person=user)
        return queryset

class NotificationsUpdate(CreateModelMixin, GenericViewSet):
    queryset = NotificationModel
    serializer_class = NotificationSerializer
    parser_classes = [JSONParser]


    def read_one(self, request, *args, **kwargs):
        notification_id = self.request.data['notification_id']
        user_id = self.request.user.id
        if notification_id == 'all':
            pass
        else:
            read_one_task = tasks.read_one_notification.delay(user_id, notification_id)
        return Response('Уведомление помечено как прочитанное')


#----------------------------------------------КАТЕГОРИИ--------------------------------------------

class CategoryListView(ListAPIView):
    queryset = CrowlerCategoryModel.objects.all().order_by('category_id')
    serializer_class = CrowlerCategorySerizalizer
    parser_classes = [JSONParser]
    pagination_class = CategoryPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryFilter



class CategoryDetailView(RetrieveAPIView):
    queryset = CrowlerCategoryModel.objects.all()
    serializer_class = CrowlerCategorySerizalizer
    lookup_field = 'category_id'
    parser_classes = [JSONParser]

class CategoryChangesList(ListAPIView):
    queryset = SiteCategoryChanges.objects.all()
    serializer_class = CategoryChangesSerializer
    lookup_field = 'category_id'
    parser_classes = [JSONParser]
    pagination_class = CategoryPagination

class CategoryChangesView(RetrieveAPIView):
    queryset = SiteCategoryChanges.objects.all()
    serializer_class = CategoryChangesSerializer
    parser_classes = [JSONParser]

#----------------------------------------------ПФС--------------------------------------------

class FilterpageListView(ListAPIView):
    queryset = CrowlerFilterPageModel.objects.all()
    serializer_class = CrowlerFilterpageSerizalizer
    parser_classes = [JSONParser]
    pagination_class = FilterpagePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FiterpageFilter
    
class FilterpageDetailView(RetrieveAPIView):
    queryset = CrowlerFilterPageModel.objects.all()
    serializer_class = CrowlerFilterpageSerizalizer
    lookup_field = 'filterpage_id'
    parser_classes = [JSONParser]

class FilterpageChangesList(ListAPIView):
    queryset = SiteFilterpageChanges.objects.all()
    serializer_class = FilterpageChangesSerializer
    lookup_field = 'filterpage_id'
    parser_classes = [JSONParser]
    pagination_class = FilterpagePagination

class FilterpageChangesView(RetrieveAPIView):
    queryset = SiteFilterpageChanges.objects.all()
    serializer_class = FilterpageChangesSerializer
    parser_classes = [JSONParser]

class CrowlerStart(CreateModelMixin, GenericViewSet):
    queryset = CrowlerCategoryModel
    serializer_class = CrowlerCategorySerizalizer
    parser_classes = [JSONParser]


    def filterpage(self, request, *args, **kwargs):
        fps_task = tasks.filterpage_parsing_task.delay()
        return Response('Сбор ПФС начат.')
    
    def category(self, request, *args, **kwargs):
        cat_task = tasks.category_parsing_task.delay()
        return Response('Сбор категорий начат.')
        
    
    