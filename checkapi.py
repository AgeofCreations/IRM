
import requests
import json


def test():
    base_url = 'http://backend.sima-land.ru/api/v3/filter-page/'
    url = base_url
    params = {'per-page': '1000'}
    headers = {
        'Authorization': 'Basic a290b3Zfb3JAZWtiLnNpbWEtbGFuZC5ydTo3eTlFQ0dBQTg=',
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.get(url, params=params, headers=headers).json()
    print('breakpoint')

test()