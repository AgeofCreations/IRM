from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.parsers import JSONParser
from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import (MonthSerializer, WeekSerializer, MetricsCategoriesSerializer,
                         MetricsTokenSerializer, ThirdLevelCategoriesDataSerializer, CategoriesDataSerializer)
from .models import (Month, Week, MetricsCategories, MetricsToken,
                    ThirdLevelCategories, ThirdLevelCategoriesData,
                    ThirdLevelWeeks, CategoriesData)
from . import tasks



# Create your views here.
class MonthView(GenericViewSet, CreateModelMixin): #/metrics/month/<pk>/
    queryset = Month
    serializer_class = MonthSerializer
    parser_classes = [JSONParser]

    def show_month(self, request, *args, **kwargs):
        request_data = self.request.data['month'].split('-')
        year = request_data[0]
        month = request_data[1]
        month_q = Month.objects.get(name=month, year=year)
        categories_all = month_q.categoriesdata_set.all()
        categories = []
        month_plan = 0
        for category in categories_all:
            category_data = {}
            weeks_data = []
            for week in category.week_set.all().order_by('in_month'):
                if week.month == month_q:
                    weeks_data.append({
                        'first_day': week.first_day,
                        'last_day': week.last_day,
                        'weekly_traffic': week.weekly_traffic,
                        'in_month': week.in_month,
                    })
            category_data.update({
                'id': category.id,
                'name': category.category_name,
                'category_plan': category.category_plan,
                'category_factual': category.category_factual,
                'percentage': int(category.category_factual / category.category_plan * 100) if category.category_plan != 0 else 0,
                'weeks_data': weeks_data,
            })
            month_plan += category.category_plan
            categories.append(category_data)
        month = []
        data_response = {
            'name': month_q.name,
            'year': month_q.year,
            'monthly_target': month_plan,
            'monthly_factual': month_q.monthly_factual,
            'site_target':  int(month_q.site_prev + month_q.site_prev / 100 * month_q.site_multiplication_percentage),
            'multiplier': month_q.site_multiplication_percentage,
            'site_factual': month_q.site_factual,
            'categories': categories,
        }
        month.append(data_response)

        return Response (data_response)

    def add_category_data(self, request, *args, **kwargs):
        request_year, request_month = self.request.data['month'].split('-')
        request_category = self.request.data['updating_category']
        new_traffic_plan = self.request.data['new_plan']
        month_q = Month.objects.get(name=request_month, year=request_year)
        category_q = month_q.categoriesdata_set.get(category_name=request_category)
        category_q.category_plan = new_traffic_plan
        category_q.save()

        return Response('Данные обновлены')

    def add_month_data(self, request, *args, **kwargs):
        request_year, request_month = self.request.data['month'].split('-')
        month_q = Month.objects.get(name=request_month, year=request_year)
        month_q.site_multiplication_percentage = self.request.data['site_target']
        month_q.save()

        return Response('Данные обновлены')
        
class CategoriesList(CreateModelMixin, GenericViewSet): 
    queryset = MetricsCategories.objects.all()
    serializer_class = MetricsCategoriesSerializer
    parser_classes = [JSONParser]

    def categories_list(self, request,*args, **kwargs): #/metrics/categories/list/
        output_list = []
        for item in MetricsCategories.objects.all():
            output_list.append(str(item.category_url))
        return Response(output_list)
    
    def update(self, requset, *args, **kwargs): #/metrics/categories/list/update/
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        for group in user_groups:
            if str(group) == 'admin':
                if action == 'add':
                    if not MetricsCategories.objects.filter(category_url__iexact=self.request.data['category']).exists():
                        category_to_add = MetricsCategories(category_url=self.request.data['category'])
                        category_to_add.save()
                        flag = True
                        return Response('Категория успешно добавлена.')
                    else: return Response('Категория уже есть в списке.', status=405)

                elif action == 'remove':
                    if MetricsCategories.objects.filter(category_url__iexact=self.request.data['category']).exists():
                        category_to_remove = MetricsCategories.objects.filter(category_url__startswith=self.request.data['category'])
                        category_to_remove.delete()
                        flag = True
                        return Response('Категория успешно удалена.')
                    else: return Response('Категория не существует.', status=405)


        if flag == False:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)

    def third_level_update(self, requset, *args, **kwargs): #/metrics/categories/third_level/update/
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        head_category = MetricsCategories.objects.get(category_url=self.request.data['head_category'])

        for group in user_groups:
            if str(group) == 'admin':
                if action == 'add':
                    if not ThirdLevelCategories.objects.filter(child_category__iexact=self.request.data['category']).exists():
                        category_to_add = ThirdLevelCategories(head_category=head_category, child_category=self.request.data['category'])
                        category_to_add.save()
                        flag = True
                        return Response('Категория успешно добавлена.')
                    else: return Response('Категория уже есть в списке.', status=405)

                elif action == 'remove':
                    if ThirdLevelCategories.objects.filter(child_category__iexact=self.request.data['category']).exists():
                        category_to_remove = ThirdLevelCategories.objects.get(child_category=self.request.data['category'])
                        category_to_remove.delete()
                        flag = True
                        return Response('Категория успешно удалена.')
                    else: return Response('Категория не существует.', status=405)


        if flag == False:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)

class MetricsTokenView(CreateModelMixin, GenericViewSet): #/metrics/week/<pk>/
    queryset = MetricsToken
    serializer_class = MetricsTokenSerializer
    parser_classes = [JSONParser]

    def show(self, request, *args, **kwargs):
        user = self.request.user
        token = user.metricstoken_set.last()

        return Response(token.token)

    def update(self, request, *args, **kwargs):
        metricstoken = MetricsToken(token=self.request.data['token'], related_user=self.request.user)
        metricstoken.save()        

        return Response('Токен добавлен.')

class RunTasks(CreateModelMixin, GenericViewSet):
    queryset = Month
    serializer_class = MonthSerializer
    parser_classes = [JSONParser]

    def collect_data(self, request, *args, **kwargs):
        tasks.collect_data.delay()
        return Response('Сбор данных по текущему месяцу начат')
    
    def create_dates(self, request, *args, **kwargs):
        tasks.create_dates.delay(force=self.request.data['force'])
        return Response('Проверка и создание дат начаты.')



class CategoryDataRetrieveView(RetrieveAPIView):
    queryset = CategoriesData.objects.all()
    serializer_class = CategoriesDataSerializer
    parser_classes = [JSONParser]
