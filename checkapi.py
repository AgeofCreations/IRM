
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
<<<<<<< HEAD
    for item in response['items']:
        print(item)

# test()


def test2():
    str1 = 'zaloopa'
    str2 = 'armenia'
    substr= 'zal'
    if str1.startswith('arm') or str2.startswith('arm'):
        print('Uspeh')
    else: print('Blyatb')

test2()
=======
    print('breakpoint')

test()
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
