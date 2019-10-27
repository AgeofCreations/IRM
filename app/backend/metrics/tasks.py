from __future__ import absolute_import, unicode_literals
from celery import shared_task
import requests
import json
import calendar
from datetime import datetime
from dateutil import (rrule, parser, relativedelta)
import urllib.parse

from .models import Month, Week, MetricsCategories, MetricsToken, CategoriesData


@shared_task
def create_dates():
    calendar_class = calendar.Calendar()
    month_now = Month.objects.filter(is_now=True)

    if month_now.exists() and month_now[0].name == str(datetime.now().month) and month_now[0].year == datetime.now().year:
        month_now[0].is_now = True

    else:
        if month_now.exists():
            month_now[0].is_now = False
            month_now[0].save()

        today = datetime.now().date()
        categories_querry = MetricsCategories.objects.all()
        month_range_tuple = calendar.monthrange(year=today.year, month=today.month)
        month_starts = f'{today.year}-{today.month}-{month_range_tuple[0]} '.replace('-1 ', '-01')
        month_ends = f'{today.year}-{today.month}-{month_range_tuple[1]}'
        month_q = Month(name=today.month, year=today.year, month_starts=month_starts, month_ends=month_ends)
        month_q.save()
        month_calendar = calendar_class.monthdatescalendar(year=today.year, month=today.month)

        for category in categories_querry:
            category_data = CategoriesData(month = month_q, category_name=category.category_url)
            category_data.save()

        category_data_q = month_q.categoriesdata_set.all()

        for week in month_calendar:

            for category in category_data_q:
                week_querry = Week(
                    month=month_q,
                    first_day=week[0],
                    last_day=week[6], 
                    category=category,
                    in_month=month_calendar.index(week)+1,
                    )
                week_querry.save()

@shared_task
def collect_data():
    token_list = []

    for item in MetricsToken.objects.all():
        token_list.append(item.token)
    today = datetime.now().date()
    month_q = Month.objects.get(is_now=True)
    headers = {
            'Authorization': f'Bearer {token_list[0]}',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    params = {
        'oauth_token': token_list[0],
        'ids': 55027,
        'accuracy': 'full',
        'limit': 100000,
        'date1': month_q.month_starts,
        'date2': month_q.month_ends,
        'dimensions': 'ym:s:searchEngine',
        'metrics': 'ym:s:users',
        'filters': "ym:s:startURLPath=@'/'",

    }
    site_factual =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
    categories_list = month_q.categoriesdata_set.all()
    for category in categories_list:
        params = {
        'oauth_token': token_list[0],
        'ids': 55027,
        'accuracy': 'full',
        'limit': 100000,
        'date1': month_q.month_starts,
        'date2': month_q.month_ends,
        'dimensions': 'ym:s:searchEngine',
        'metrics': 'ym:s:users',
        'filters': f"ym:s:startURLPath=@'{category.category_name}/'",
        }
    
        cat_monthly =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
        category.category_factual = cat_monthly
        category.save()


    month_q.site_factual = site_factual
    month_q.save()
    week_list = month_q.week_set.all()
    token_count = len(week_list) / len(token_list)
    i = 1
    month_summary = 0

    for week in week_list:
        token_limits = len(week_list) // len(token_list)
        token_index = i // token_limits
        token = token_list[token_index]
        print(token)
        params = {
        'oauth_token': token,
        'ids': 55027,
        'accuracy': 'full',
        'limit': 100000,
        'date1': week.first_day,
        'date2': week.last_day,
        'dimensions': 'ym:s:searchEngine',
        'metrics': 'ym:s:users',
        'filters': f"ym:s:startURLPath=@'/{week.category.category_name}/'",
        }
        factual_traffic =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
        week.weekly_traffic = factual_traffic
        week.save()
        month_summary = month_summary + factual_traffic
        i =+ i

    month_q.monthly_factual = month_summary
    month_q.save()

        


