from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.parsers import JSONParser
from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import MonthSerializer, WeekSerializer, MetricsCategoriesSerializer
from .models import Month, Week, MetricsCategories
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
                'name': category.category_name,
                'category_plan': category.category_plan,
                'category_factual': category.category_factual,
                'weeks_data': weeks_data
            })
            categories.append(category_data)
        month = []
        data_response = {
            'name': month_q.name,
            'year': month_q.year,
            'monthly_target': month_q.monthly_target,
            'monthly_factual': month_q.monthly_factual,
            'site_target': month_q.site_target,
            'site_factual': month_q.site_factual,
            'categories': categories
        }
        month.append(data_response)

        return Response (data_response)

    def test_task(self, request, *args, **kwargs):
        tasks.collect_data.delay()
        return Response('тест начат')
        
class CategoriesList(CreateModelMixin, GenericViewSet): 
    queryset = MetricsCategories.objects.all()
    serializer_class = MetricsCategoriesSerializer
    parser_classes = [JSONParser]

    def list(self, request,*args, **kwargs): #/crowler/notify/categories/
        output_list = []
        for item in MetricsCategories.objects.all():
            output_list.append(str(item.category_url))
        
        return Response(output_list)
    
    def update(self, requset, *args, **kwargs): #/crowler/notify/categories/update/
        flag = False
        user_id = self.request.user.id
        user_groups = self.request.user.groups.all()
        action = self.request.data['action']
        for group in user_groups:
            if str(group) == 'admin':
                if action == 'add':
                    if not Categories.objects.filter(category__iexact=self.request.data['category']).exists():
                        category_to_add = Categories(category=self.request.data['category'])
                        category_to_add.save()
                        flag = True
                        return Response('Категория успешно добавлена. Не забудьте подписаться на неё.')
                    else: return Response('Категория уже есть в списке.', status=405)

                elif action == 'remove':
                    if Categories.objects.filter(category__iexact=self.request.data['category']).exists():
                        category_to_remove = Categories.objects.filter(category__startswith=self.request.data['category'])
                        category_to_remove.delete()
                        flag = True
                        return Response('Категория успешно удалена.')
                    else: return Response('Категория не существует.', status=405)


        if flag == False:
            return Response('Вы не обладаете достаточными правами для совершения операции',status=403)

class WeekView(RetrieveAPIView): #/metrics/week/<pk>/
    queryset = Week
    serializer_class = WeekSerializer
    parser_classes = [JSONParser]