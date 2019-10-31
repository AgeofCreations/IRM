from __future__ import absolute_import, unicode_literals
from celery import shared_task
import requests
import json
import calendar
from datetime import datetime
from dateutil import (rrule, parser, relativedelta)
import urllib.parse

from .models import (Month, Week, MetricsCategories,
                    MetricsToken, CategoriesData, ThirdLevelCategories,
                    ThirdLevelCategoriesData, ThirdLevelWeeks)


@shared_task
def create_dates(force):
    calendar_class = calendar.Calendar()
    month_now = Month.objects.filter(is_now=True)

    if  force != 'True' and month_now.exists() and month_now[0].name == str(datetime.now().month) and month_now[0].year == datetime.now().year:
        month_now[0].is_now = True

    else:
        if force != 'True' and month_now.exists():
            month_now[0].is_now = False
            month_now[0].save()
        elif force == 'True' and month_now.exists():
            month_now[0]
            month_now[0].delete()

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
            third_level_categories_set = category.thirdlevelcategories_set.all()
            for item in third_level_categories_set:
                tlcd = ThirdLevelCategoriesData(month_category=category_data, child_category=item.child_category)
                tlcd.save()

        category_data_q = month_q.categoriesdata_set.all()

        for week in month_calendar:
            if week[0].month < today.month:
                week[0] = f'{today.year}-{today.month}-01'

            if week[6].month > today.month:
                week[6] = f'{today.year}-{today.month}-{month_range_tuple[1]}'
            
            for category in category_data_q:
                week_querry = Week(
                    month=month_q,
                    first_day=week[0],
                    last_day=week[6], 
                    category=category,
                    in_month=month_calendar.index(week)+1,
                    )
                week_querry.save()

                tlcd_q = category.third_level.all()
                for tlcd in tlcd_q:
                    tlw_q = ThirdLevelWeeks(
                        child_category_data=tlcd,
                        first_day=week[0],
                        last_day=week[6],
                        in_month=month_calendar.index(week)+1,
                    )
                    tlw_q.save()
    if force == 'True':
        collect_data()


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
    month_starts = month_q.month_starts.split('-')
    month_ends = month_q.month_ends.split('-')

    site_factual =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
    params = {
        'oauth_token': token_list[0],
        'ids': 55027,
        'accuracy': 'full',
        'limit': 100000,
        'date1': str(int(month_starts[0]) - 1) + '-' + month_starts[1] + '-' + month_starts[2],
        'date2': str(int(month_ends[0]) - 1) + '-' + month_ends[1] + '-' + month_ends[2],
        'dimensions': 'ym:s:searchEngine',
        'metrics': 'ym:s:users',
        'filters': "ym:s:startURLPath=@'/'",

    }
    site_prev =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
    
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
        third_lvl_r = category.third_level.all()
        for item in third_lvl_r:
            params = {
                'oauth_token': token_list[0],
                'ids': 55027,
                'accuracy': 'full',
                'limit': 100000,
                'date1': month_q.month_starts,
                'date2': month_q.month_ends,
                'dimensions': 'ym:s:searchEngine',
                'metrics': 'ym:s:users',
                'filters': f"ym:s:startURLPath=@'{item.child_category}/'",
            }
            
            item_monthly =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
            item.child_category_traffic = item_monthly
            item.save()
            third_lvl_weeks_r = item.weeks.all()
            for week in third_lvl_weeks_r:
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
                    'date1': week.first_day,
                    'date2': week.last_day,
                    'dimensions': 'ym:s:searchEngine',
                    'metrics': 'ym:s:users',
                    'filters': f"ym:s:startURLPath=@'/{week.child_category_data.child_category}/'",
                }
                factual_traffic =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
                week.weekly_traffic = factual_traffic
                week.save()


    month_q.site_factual = site_factual
    month_q.site_prev = site_prev
    month_q.save()
    week_list = month_q.week_set.all()
    token_count = len(week_list) / len(token_list)
    i = 1
    month_summary = 0

    for week in week_list:
        token_limits = len(week_list) // len(token_list)
        token_index = i // token_limits
        print(token_list[token_index])
        headers = {
            'Authorization': f'Bearer {token_list[token_index]}',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
        params = {
        'oauth_token': token_list[token_index],
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

        


