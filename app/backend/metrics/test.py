import calendar
from datetime import datetime
from dateutil import (rrule, parser, relativedelta)
import requests
import json
calendar_class = calendar.TextCalendar()

now = datetime.now()
today = now.date()
test = calendar.monthrange(year=today.year, month=today.month)
def test():
    headers = {
            'Authorization': f'Bearer AQAEA7qiRQZxAAWAqzOCDLRwSkEVnXSwEi4vT1k',
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }
    params = {
        'oauth_token': 'AQAEA7qiRQZxAAWAqzOCDLRwSkEVnXSwEi4vT1k',
        'ids': 55027,
        'accuracy': 'full',
        'limit': 100000,
        'date1': '2019-10-01',
        'date2': '2019-10-31',
        'dimensions': 'ym:s:searchEngine',
        'metrics': 'ym:s:users',
        'filters': "ym:s:startURLPath=@'/'",

    }
    site_factual =  int(requests.get(f'https://api-metrika.yandex.ru/stat/v1/data', params=params, headers=headers).json()['totals'][0])
    print(site_factual)

test()