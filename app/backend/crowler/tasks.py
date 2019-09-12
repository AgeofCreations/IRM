from __future__ import absolute_import, unicode_literals
from celery import shared_task
# import ipdb
import requests
import json
from django.utils import timezone
<<<<<<< HEAD
from .models import (CrowlerCategoryModel, SiteCategoryChanges,
 CrowlerFilterPageModel, SiteFilterpageChanges,
 NotificationModel, Responsibilities, Categories)
from django.contrib.auth import get_user_model
UserModel = get_user_model()
=======
from .models import CrowlerCategoryModel, SiteCategoryChanges, CrowlerFilterPageModel, SiteFilterpageChanges
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645


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
        
<<<<<<< HEAD
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
=======
        url = response['_links']['next']['href']

        for i in range(0, len(response['items']) - 1):
            kwargs_dict = {
                'category_id': response['items'][i]['id'],
                'category_name': response['items'][i]['name'],
                'category_path':response['items'][i]['path'],
                'category_lvl': response['items'][i]['level'],
                'category_url': response['items'][i]['full_name_slug'],
                'category_parent_id': response['items'][i]['parent_id'],
                'category_full_name': response['items'][i]['full_name'],
                'category_is_active': response['items'][i]['is_active'],
                'category_title': response['items'][i]['page_title'],
                'category_description': response['items'][i]['page_description'],
                'category_has_robots_nofollow': response['items'][i]['has_robots_nofollow'],
                'category_has_robots_noindex': response['items'][i]['has_robots_noindex'],
                'category_canonical_url': response['items'][i]['canonical_url'],
                'category_seo_text': response['items'][i]['seo_text'],
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
                'category_data_updated': timezone.now()
                }

            dict_old = {
<<<<<<< HEAD
                'category_id': item['id'],
=======
                'category_id': response['items'][i]['id'],
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
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
<<<<<<< HEAD
                q = CrowlerCategoryModel.objects.get(category_id__exact=kwargs_dict['category_id'])
                
                #Сраниваем. Если равно - ничего не делаем. Если нет - сохраняем в качестве старых данных, перезаписывая в dict_old.
                kwargs_dict.pop('category_data_updated')
                for key, value in kwargs_dict.items():
                    if value != getattr(q, key):
                        dict_old.update({
                            'old_{}'.format(key) : getattr(q, key),
                            'changed_fields': dict_old['changed_fields'] + '\n {}'.format(key)})
=======
                q = CrowlerCategoryModel.objects.filter(category_id__exact=kwargs_dict['category_id']).get()
                
                #Сраниваем. Если равно - ничего не делаем. Если нет - сохраняем в качестве старых данных, перезаписывая в dict_old.
                if kwargs_dict['category_name'] != q.category_name:
                    dict_old.update({
                        'old_category_name': q.category_name,
                         'changed_fields': dict_old['changed_fields'] + '\n name'})

                if kwargs_dict['category_path'] != q.category_path:
                    dict_old.update({
                        'old_category_path': q.category_path,
                         'changed_fields': dict_old['changed_fields'] + '\n path'})

                if kwargs_dict['category_lvl'] != q.category_lvl:
                    dict_old.update({
                        'old_category_lvl': q.category_lvl,
                         'changed_fields': dict_old['changed_fields'] + '\n lvl'})

                if kwargs_dict['category_url'] != q.category_url:
                    dict_old.update({
                        'old_category_url': q.category_url,
                         'changed_fields': dict_old['changed_fields'] + '\n url'})

                if kwargs_dict['category_parent_id'] != q.category_parent_id:
                    dict_old.update({
                        'old_category_parent_id': q.category_parent_id,
                         'changed_fields': dict_old['changed_fields'] + '\n parent_id'})

                if kwargs_dict['category_full_name'] != q.category_full_name:
                    dict_old.update({
                        'old_category_full_name': q.category_full_name,
                         'changed_fields': dict_old['changed_fields'] + '\n full_name'})

                if kwargs_dict['category_is_active'] != q.category_is_active:
                    dict_old.update({
                        'old_category_is_active': q.category_is_active,
                         'changed_fields': dict_old['changed_fields'] + '\n is_active'})

                if kwargs_dict['category_title'] != q.category_title:
                    dict_old.update({
                        'old_category_title': q.category_title,
                         'changed_fields': dict_old['changed_fields'] + '\n title'})

                if kwargs_dict['category_description'] != q.category_description:
                    dict_old.update({
                        'old_category_description': q.category_description,
                         'changed_fields': dict_old['changed_fields'] + '\n description'})

                if kwargs_dict['category_has_robots_nofollow'] != q.category_has_robots_nofollow:
                    dict_old.update({
                        'old_category_has_robots_nofollow': q.category_has_robots_nofollow,
                         'changed_fields': dict_old['changed_fields'] + '\n nofollow'})

                if kwargs_dict['category_has_robots_noindex'] != q.category_has_robots_noindex:
                    dict_old.update({
                        'old_category_has_robots_noindex': q.category_has_robots_noindex,
                         'changed_fields': dict_old['changed_fields'] + '\n noindex'})

                if kwargs_dict['category_canonical_url'] != q.category_canonical_url:
                    dict_old.update({
                        'old_category_canonical_url': q.category_canonical_url,
                         'changed_fields': dict_old['changed_fields'] + '\n canonical_url'})

                if kwargs_dict['category_seo_text'] != q.category_seo_text:
                    dict_old.update({
                        'old_category_seo_text': q.category_seo_text,
                         'changed_fields': dict_old['changed_fields'] + '\n seo_text'})
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645

                #Если есть изменения - записываем "Старый вариант" и записываем обновлённый с соответствующим айдишником. Если нет - ничего не делаем.
                if dict_old != dict_old_check:
                    q_old = SiteCategoryChanges(**dict_old)
                    q_old.save()
<<<<<<< HEAD
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

=======
                    qid = q.id
                    q = CrowlerCategoryModel(id=qid, **kwargs_dict)
                    q.save()
            else:
                q = CrowlerCategoryModel(**kwargs_dict)
                q.save()
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
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
<<<<<<< HEAD
        print('Doing {}'.format(url))
=======
        print('doing {}'.format(url))
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
        # kwargs_dict - словарь с актуальными данными по каждой пфс
        # old_dict - словарь для модели с изменениями. Объявляется забитый актуальной инфой. Потом в случае расхождений поля с old_ заменяются
        # создаётся копия old_dict, с которой оригинальный словарь сравнивается в конце итерации. Если они не равны, создаётся запись в БД
        #
<<<<<<< HEAD
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
=======
        for i in range(0, len(response['items']) - 1):
            kwargs_dict = {
                'filterpage_id': response['items'][i]['id'],
                'filterpage_url': response['items'][i]['slug'],
                'filterpage_title': response['items'][i]['page_title'],
                'filterpage_description': response['items'][i]['page_description'],
                'filterpage_text': response['items'][i]['page_text'],
                'filterpage_name': response['items'][i]['name'],
                'filterpage_full_name':response['items'][i]['full_name'],
                'filterpage_is_active': response['items'][i]['is_active'],
                'filterpage_disabling_reason': response['items'][i]['disabling_reason'],
                'filterpage_has_robots_nofollow': response['items'][i]['has_robots_nofollow'],
                'filterpage_has_robots_noindex': response['items'][i]['has_robots_noindex'],
                'filterpage_canonical_url': response['items'][i]['canonical_url'],
                'filterpage_is_top': response['items'][i]['is_top'],
                'filterpage_is_active_changed_at': response['items'][i]['is_active_changed_at'],
                'filterpage_created_at': response['items'][i]['created_at'],
                'filterpage_h1': response['items'][i]['h1'],
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
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
<<<<<<< HEAD
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


    


    


=======
                if kwargs_dict['filterpage_url'] != q.filterpage_url:
                    dict_old.update({
                        'old_filterpage_url': q.filterpage_url,
                         'changed_fields': dict_old['changed_fields'] + '\n url'})

                if kwargs_dict['filterpage_title'] != q.filterpage_title:
                    dict_old.update({
                        'old_filterpage_title': q.filterpage_title,
                         'changed_fields': dict_old['changed_fields'] + '\n title'})

                if kwargs_dict['filterpage_description'] != q.filterpage_description:
                    dict_old.update({
                        'old_filterpage_description': q.filterpage_description,
                         'changed_fields': dict_old['changed_fields'] + '\n description'})

                if kwargs_dict['filterpage_text'] != q.filterpage_text:
                    dict_old.update({
                        'old_filterpage_text': q.filterpage_text,
                         'changed_fields': dict_old['changed_fields'] + '\n seo_text'})

                if kwargs_dict['filterpage_name'] != q.filterpage_name:
                    dict_old.update({
                        'old_filterpage_name': q.filterpage_name,
                         'changed_fields': dict_old['changed_fields'] + '\n name'})

                if kwargs_dict['filterpage_full_name'] != q.filterpage_full_name:
                    dict_old.update({
                        'old_filterpage_full_name': q.filterpage_full_name,
                         'changed_fields': dict_old['changed_fields'] + '\n full_name'})

                if kwargs_dict['filterpage_is_active'] != q.filterpage_is_active:
                    dict_old.update({
                        'old_filterpage_is_active': q.filterpage_is_active,
                         'changed_fields': dict_old['changed_fields'] + '\n is_active'})

                if kwargs_dict['filterpage_disabling_reason'] != q.filterpage_disabling_reason:
                    dict_old.update({
                        'old_filterpage_disabling_reason': q.filterpage_disabling_reason,
                         'changed_fields': dict_old['changed_fields'] + '\n disabling_reason'})

                if kwargs_dict['filterpage_has_robots_nofollow'] != q.filterpage_has_robots_nofollow:
                    dict_old.update({
                        'old_filterpage_has_robots_nofollow': q.filterpage_has_robots_nofollow,
                         'changed_fields': dict_old['changed_fields'] + '\n nofollow'})

                if kwargs_dict['filterpage_has_robots_noindex'] != q.filterpage_has_robots_noindex:
                    dict_old.update({
                        'old_filterpage_has_robots_noindex': q.filterpage_has_robots_noindex,
                         'changed_fields': dict_old['changed_fields'] + '\n noindex'})

                if kwargs_dict['filterpage_canonical_url'] != q.filterpage_canonical_url:
                    dict_old.update({
                        'old_filterpage_canonical_url': q.filterpage_canonical_url,
                         'changed_fields': dict_old['changed_fields'] + '\n canonical_url'})

                if kwargs_dict['filterpage_is_top'] != q.filterpage_is_top:
                    dict_old.update({
                        'old_filterpage_is_top': q.filterpage_is_top,
                         'changed_fields': dict_old['changed_fields'] + '\n is_top'})

                if kwargs_dict['filterpage_is_active_changed_at'] != q.filterpage_is_active_changed_at:
                    dict_old.update({
                        'old_filterpage_is_active_changed_at': q.filterpage_is_active_changed_at,
                         'changed_fields': dict_old['changed_fields'] + '\n is_active_changed_at'})

                if kwargs_dict['filterpage_created_at'] != q.filterpage_created_at:
                    dict_old.update({
                        'old_filterpage_created_at': q.filterpage_created_at,
                         'changed_fields': dict_old['changed_fields'] + '\n created_at'})

                if kwargs_dict['filterpage_h1'] != q.filterpage_h1:
                    dict_old.update({
                        'old_filterpage_h1': q.filterpage_h1,
                         'changed_fields': dict_old['changed_fields'] + '\n h1'})

                #Если есть изменения - записываем "Старый вариант". Если нет - ничего не делаем.
                if dict_old != dict_old_check:
                    q_old = SiteFilterpageChanges(**dict_old)
                    q_old.save()
                    qid = q.id
                    q = CrowlerFilterPageModel(id=qid, **kwargs_dict)
                    q.save()
            else:
                q = CrowlerFilterPageModel(**kwargs_dict)
                q.save()

        if flag:
            break
>>>>>>> 00cf893ffff467989f2c64f1f85ab2801ccbf645
