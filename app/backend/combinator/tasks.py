from celery import shared_task
import requests
import json

@shared_task
def try_request():
    base_url = 'http://backend.sima-land.ru/api/v3/category/'
    url = base_url
    params = {'per-page': '1000'}
    headers = {
        'Authorization': 'Basic a290b3Zfb3JAZWtiLnNpbWEtbGFuZC5ydTo3eTlFQ0dBQTg=',
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.get(url, params=params, headers=headers).json()

    for i in range(1, len(response['items']) - 1):
     id = response['items'][i]['id']
     print(id)