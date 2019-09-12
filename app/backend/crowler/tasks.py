from __future__ import absolute_import, unicode_literals
from celery import shared_task
# import ipdb
import requests
import json
from django.utils import timezone
from .models import (CrowlerCategoryModel, SiteCategoryChanges,
 CrowlerFilterPageModel, SiteFilterpageChanges,
 NotificationModel, Responsibilities, Categories)
from django.contrib.auth import get_user_model
UserModel = get_user_model()


@shared_task
def category_parsing_task():
    base_url = 'http://backend.sima-land.ru/api/v3/category/'
    url = base_url
    while True:
        flag = False
        params = {'per-page': '1000'}
        headers = {
            'Authorization': 'Basic a290b3Zfb3JAZWtiLnNpbWEtbGFuZC5ydTo3eTlFQ0dBQTg=',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }

        response = requests.get(url, params=params, headers=headers).json()
        
        try: # Когда страницы закончатся, выдаст KeyError и разорвёт цикл.
            url = response['_links']['next']['href']
        except KeyError: 
            flag = True
        print('Doing {}'.format(url))

        for item in response['items']:

            kwargs_dict = {
                'category_id': item['id'],
                'category_name': item['name'],
                'category_path': item['path'],
                'category_lvl': item['level'],
                'category_url': item['full_name_slug'],
                'category_parent_id': item['parent_id'],
                'category_full_name': item['full_name'],
                'category_is_active': item['is_active'],
                'category_title': item['page_title'],
                'category_description': item['page_description'],
                'category_has_robots_nofollow': item['has_robots_nofollow'],
                'category_has_robots_noindex': item['has_robots_noindex'],
                'category_canonical_url': item['canonical_url'],
                'category_seo_text': item['seo_text'],
                'category_data_updated': timezone.now()
                }

            dict_old = {
                'category_id': item['id'],
                'old_category_name': kwargs_dict['category_name'],
                'old_category_path': kwargs_dict['category_path'],
                'old_category_lvl': kwargs_dict['category_lvl'],
                'old_category_url': kwargs_dict['category_url'],
                'old_category_parent_id': kwargs_dict['category_parent_id'],
                'old_category_full_name': kwargs_dict['category_full_name'],
                'old_category_is_active': kwargs_dict['category_is_active'],
                'old_category_title': kwargs_dict['category_title'],
                'old_category_description': kwargs_dict['category_description'],
                'old_category_has_robots_nofollow': kwargs_dict['category_has_robots_nofollow'],
                'old_category_has_robots_noindex': kwargs_dict['category_has_robots_noindex'],
                'old_category_canonical_url': kwargs_dict['category_canonical_url'],
                'old_category_seo_text': kwargs_dict['category_seo_text'],
                'new_category_name': kwargs_dict['category_name'],
                'new_category_path': kwargs_dict['category_path'],
                'new_category_lvl': kwargs_dict['category_lvl'],
                'new_category_url': kwargs_dict['category_url'],
                'new_category_parent_id': kwargs_dict['category_parent_id'],
                'new_category_full_name': kwargs_dict['category_full_name'],
                'new_category_is_active': kwargs_dict['category_is_active'],
                'new_category_title': kwargs_dict['category_title'],
                'new_category_description': kwargs_dict['category_description'],
                'new_category_has_robots_nofollow': kwargs_dict['category_has_robots_nofollow'],
                'new_category_has_robots_noindex': kwargs_dict['category_has_robots_noindex'],
                'new_category_canonical_url': kwargs_dict['category_canonical_url'],
                'new_category_seo_text': kwargs_dict['category_seo_text'],
                'changed_fields': '',
                'category_data_changed': timezone.now()
            }
            dict_old_check = dict_old.copy()

            if CrowlerCategoryModel.objects.filter(category_id__exact=kwargs_dict['category_id']).exists():
                q = CrowlerCategoryModel.objects.get(category_id__exact=kwargs_dict['category_id'])
                
                #Сраниваем. Если равно - ничего не делаем. Если нет - сохраняем в качестве старых данных, перезаписывая в dict_old.
                kwargs_dict.pop('category_data_updated')
                for key, value in kwargs_dict.items():
                    if value != getattr(q, key):
                        dict_old.update({
                            'old_{}'.format(key) : getattr(q, key),
                            'changed_fields': dict_old['changed_fields'] + '\n {}'.format(key)})

                #Если есть изменения - записываем "Старый вариант" и записываем обновлённый с соответствующим айдишником. Если нет - ничего не делаем.
                if dict_old != dict_old_check:
                    q_old = SiteCategoryChanges(**dict_old)
                    q_old.save()
                    q_old_id = q_old.id
                    qid = q.id
                    q = CrowlerCategoryModel(id=qid, **kwargs_dict)
                    q.save()
                    make_cat_notification.delay(id=q_old_id,action='changed',action_subject=dict_old['changed_fields'])
            else:
                q = CrowlerCategoryModel(**kwargs_dict)
                q.save()
                qid = q.id
                make_cat_notification.delay(id=qid,action='created',action_subject=dict_old['changed_fields'])

            if kwargs_dict['category_id'] > 7000000: #>7000000 это промо и прочее ненужное. Ставим флаг и рвём циклы.
                flag = True
                break

        if flag:
            break



@shared_task 
def filterpage_parsing_task():
    base_url = 'http://backend.sima-land.ru/api/v3/filter-page/'
    url = base_url
    while True:
        flag = False
        params = {'per-page': '1000'}
        headers = {
            'Authorization': 'Basic a290b3Zfb3JAZWtiLnNpbWEtbGFuZC5ydTo3eTlFQ0dBQTg=',
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }

        response = requests.get(url, params=params, headers=headers).json()
        
        try: # Когда страницы закончатся, выдаст KeyError и разорвёт цикл.
            url = response['_links']['next']['href']
        except KeyError: 
            flag = True
        print('Doing {}'.format(url))
        # kwargs_dict - словарь с актуальными данными по каждой пфс
        # old_dict - словарь для модели с изменениями. Объявляется забитый актуальной инфой. Потом в случае расхождений поля с old_ заменяются
        # создаётся копия old_dict, с которой оригинальный словарь сравнивается в конце итерации. Если они не равны, создаётся запись в БД
        #
        for item in response['items']:
            kwargs_dict = {
                'filterpage_id': item['id'],
                'filterpage_url': item['slug'],
                'filterpage_title': item['page_title'],
                'filterpage_description': item['page_description'],
                'filterpage_text': item['page_text'],
                'filterpage_name': item['name'],
                'filterpage_full_name':item['full_name'],
                'filterpage_is_active': item['is_active'],
                'filterpage_disabling_reason': item['disabling_reason'],
                'filterpage_has_robots_nofollow': item['has_robots_nofollow'],
                'filterpage_has_robots_noindex': item['has_robots_noindex'],
                'filterpage_canonical_url': item['canonical_url'],
                'filterpage_is_top': item['is_top'],
                'filterpage_is_active_changed_at': item['is_active_changed_at'],
                'filterpage_created_at': item['created_at'],
                'filterpage_h1': item['h1'],
                'filterpage_data_updated': timezone.now()
                }

            dict_old = {
                'filterpage_id': kwargs_dict['filterpage_id'],
                'old_filterpage_url': kwargs_dict['filterpage_url'],
                'old_filterpage_title': kwargs_dict['filterpage_title'],
                'old_filterpage_description': kwargs_dict['filterpage_description'],
                'old_filterpage_text': kwargs_dict['filterpage_text'],
                'old_filterpage_name': kwargs_dict['filterpage_name'],
                'old_filterpage_full_name': kwargs_dict['filterpage_full_name'],
                'old_filterpage_is_active': kwargs_dict['filterpage_is_active'],
                'old_filterpage_disabling_reason': kwargs_dict['filterpage_disabling_reason'],
                'old_filterpage_has_robots_nofollow': kwargs_dict['filterpage_has_robots_nofollow'],
                'old_filterpage_has_robots_noindex': kwargs_dict['filterpage_has_robots_noindex'],
                'old_filterpage_canonical_url': kwargs_dict['filterpage_canonical_url'],
                'old_filterpage_is_top': kwargs_dict['filterpage_is_top'],
                'old_filterpage_is_active_changed_at': kwargs_dict['filterpage_is_active_changed_at'],
                'old_filterpage_created_at': kwargs_dict['filterpage_created_at'],
                'old_filterpage_h1': kwargs_dict['filterpage_h1'],
                'new_filterpage_url': kwargs_dict['filterpage_url'],
                'new_filterpage_title': kwargs_dict['filterpage_title'],
                'new_filterpage_description': kwargs_dict['filterpage_description'],
                'new_filterpage_text': kwargs_dict['filterpage_text'],
                'new_filterpage_name': kwargs_dict['filterpage_name'],
                'new_filterpage_full_name': kwargs_dict['filterpage_full_name'],
                'new_filterpage_is_active': kwargs_dict['filterpage_is_active'],
                'new_filterpage_disabling_reason': kwargs_dict['filterpage_disabling_reason'],
                'new_filterpage_has_robots_nofollow': kwargs_dict['filterpage_has_robots_nofollow'],
                'new_filterpage_has_robots_noindex': kwargs_dict['filterpage_has_robots_noindex'],
                'new_filterpage_canonical_url': kwargs_dict['filterpage_canonical_url'],
                'new_filterpage_is_top': kwargs_dict['filterpage_is_top'],
                'new_filterpage_is_active_changed_at': kwargs_dict['filterpage_is_active_changed_at'],
                'new_filterpage_created_at': kwargs_dict['filterpage_created_at'],
                'new_filterpage_h1': kwargs_dict['filterpage_h1'],
                'changed_fields': '',
                'filterpage_data_changed': timezone.now()
            }
            dict_old_check = dict_old.copy()

            #Если id существует - проверяем изменения.
            #Если не существует - создаём новую запись.
            if CrowlerFilterPageModel.objects.filter(filterpage_id__exact=kwargs_dict['filterpage_id']).exists():
                q = CrowlerFilterPageModel.objects.filter(filterpage_id__exact=kwargs_dict['filterpage_id']).get()
                
                #Сраниваем. Если равно - ничего не делаем.
                #Если нет - сохраняем в качестве старых данных и записываем что поменялось в changed_fields в old_dict
                kwargs_dict.pop('filterpage_data_updated')
                for key, value in kwargs_dict.items():
                    if value != getattr(q, key):
                        dict_old.update({
                            'old_{}'.format(key) : getattr(q, key),
                            'changed_fields': dict_old['changed_fields'] + '\n {}'.format(key)})

                #Если есть изменения - записываем "Старый вариант". Если нет - ничего не делаем.
                if dict_old != dict_old_check:
                    
                    q_old = SiteFilterpageChanges(**dict_old)
                    q_old.save()
                    q_old_id = q_old.id
                    qid = q.id
                    q = CrowlerFilterPageModel(id=qid, **kwargs_dict)
                    q.save()
                    make_pfs_notification.delay(id=q_old_id,action='changed',action_subject=dict_old['changed_fields'])
            else:
                q = CrowlerFilterPageModel(**kwargs_dict)
                q.save()
                qid = q.id
                print(qid)
                print('creating')
                make_pfs_notification.delay(id=qid,action='created',action_subject=dict_old['changed_fields'])

        if flag:
            break


@shared_task
def make_pfs_notification(id, action, action_subject):
    kwargs_dict={
        'filterpage_id': '',
        'action_is': action,
        'action_subjects': action_subject,
        'action_id': id,
    }
    p1 = Categories.objects.all() #Все разделы сайта
    if action == 'changed':
        q = SiteFilterpageChanges.objects.get(id=id)
        kwargs_dict.update({'filterpage_id':q.filterpage_id})
        p_index = 0
        for p in p1:
            q = SiteFilterpageChanges.objects.get(id=id)
            if (str(q.old_filterpage_url).startswith(str(p)) or str(q.new_filterpage_url).startswith(str(p))):
                r_user = p1[p_index].responsibilities_set.all()
                #r_user - Ответственный пользователь. Берётся из ManyToManyField, которые привязаны к модели категорий
                q_notify = NotificationModel(**kwargs_dict)
                q_notify.save()
                for item in r_user:
                    usermodel = UserModel.objects.get(username=item)
                    user_id = usermodel.pk
                    q_notify.resposive_person.add(user_id)
                    q_notify.not_read.add(user_id)
            p_index += 1

                #Добавляются значение ответственного пользователя для уведомления,
                # флаг "Не прочитано" и флаг "Акутально"(не удалено пользователем из своего фида)
    elif action == 'created':
        q = CrowlerFilterPageModel.objects.get(id=id)
        kwargs_dict.update({'filterpage_id':q.filterpage_id})
        p_index = 0
        for p in p1:
            if (str(q.filterpage_url).startswith(str(p))):
                r_user = p1[p_index].responsibilities_set.all()
                q_notify = NotificationModel(**kwargs_dict)
                q_notify.save()
                for item in r_user:
                    usermodel = UserModel.objects.get(username=item)
                    user_id = usermodel.pk
                    q_notify.resposive_person.add(user_id)
                    q_notify.not_read.add(user_id)
            p_index += 1


@shared_task
def make_cat_notification(id, action, action_subject):
    kwargs_dict={
        'category_id': '',
        'action_is': action,
        'action_subjects': action_subject,
        'action_id': id,

    }
    p1 = Categories.objects.all()
    if action == 'changed':
        q = SiteCategoryChanges.objects.get(id=id)
        kwargs_dict.update({'category_id':q.category_id})
        p_index = 0

        for p in p1:
            if (str(q.old_category_url).startswith(str(p)) or str(q.new_category_url).startswith(str(p))):
                r_user = p1[p_index].responsibilities_set.all() 
                q = NotificationModel(**kwargs_dict)
                q.save()
                q.resposive_person.add(r_user)
                q.not_read.add(r_user)

            p_index += 1

    elif action == 'created':
        q = CrowlerCategoryModel.objects.get(id=id)
        kwargs_dict.update({'category_id':q.category_id})
        p_index = 0
        for p in p1:
            if (str(q.category_url).startswith(str(p))):
                r_user = p1[p_index].responsibilities_set.all()
                q = NotificationModel(**kwargs_dict)
                q.save()
                q.resposive_person.add(r_user)
                q.not_read.add(r_user)

            p_index += 1

@shared_task
def read_one_notification(user_id, notification_id):
    user_read = UserModel.objects.get(id=user_id)
    notification_read = NotificationModel.objects.get(id=notification_id)
    q = notification_read.not_read.remove(user_read)
    q.save(id=notification_id)


    


    


