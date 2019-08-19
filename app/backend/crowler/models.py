from django.db.models import Model, IntegerField, CharField, BooleanField, DateTimeField, TextField



class CrowlerCategoryModel(Model):
    category_id = IntegerField()
    category_name = CharField(max_length=240, null=True)
    category_path = CharField(max_length=500, null=True)
    category_lvl = IntegerField(null=True)
    category_url = CharField(max_length=500, null=True) #full_name_slug в API
    category_parent_id = IntegerField(null=True)
    category_title = TextField(null=True) #page_title в API
    category_description = TextField(null=True) #page_description в API
    category_full_name = TextField(null=True)
    category_has_robots_nofollow = IntegerField(null=True)
    category_has_robots_noindex = IntegerField(null=True)
    category_canonical_url = CharField(max_length=500, null=True)
    category_is_active = IntegerField(null=True)
    category_is_season = BooleanField(null=True)
    category_seo_text = TextField(null=True)
    category_data_updated = DateTimeField(null=True) 
    # К data_updated привяжем уведомления о том, что категория, возможно, удалена.
    # Запилю периодическую ежедневную проверку поля со сравнением с текущими дата/время сервера.
    # Если data_updated меньше на 2 дня, то уведомление о том, что категория, возможно, удалена.
    # Ещё как вариант внеочередной парсинг и поиск в API. Если нет - перемещение в таблицу-архив. Каждое второе воскресенье очистка архивов. 
    def __str__(self):
        return self.category_name

class CrowlerFilterPageModel(Model):
    filterpage_id = IntegerField() 
    filterpage_url = CharField(max_length=500, null=True) #slug
    filterpage_title = TextField(null=True) #page_title
    filterpage_description = TextField(null=True) #page_title
    filterpage_text = TextField(null=True) #page_text
    filterpage_name = CharField(max_length=240, null=True)
    filterpage_full_name = TextField(null=True)
    filterpage_is_active = IntegerField(null=True)
    filterpage_disabling_reason = CharField(max_length=240, null=True)
    filterpage_has_robots_nofollow = IntegerField(null=True)
    filterpage_has_robots_noindex = IntegerField(null=True)
    filterpage_canonical_url = CharField(max_length=500, null=True)
    filterpage_is_top = BooleanField(null=True)
    filterpage_is_active_changed_at = TextField(null=True)
    filterpage_created_at = TextField(null=True)
    filterpage_h1 = TextField(null=True)
    filterpage_data_updated = DateTimeField(null=True) 



class SiteCategoryChanges(Model):
    category_id = IntegerField()
    old_category_name = CharField(max_length=240, null=True)
    old_category_path = CharField(max_length=500, null=True)
    old_category_lvl = IntegerField(null=True)
    old_category_url = CharField(max_length=500, null=True) #full_name_slug в API
    old_category_parent_id = IntegerField(null=True)
    old_category_title = TextField(null=True) #page_title в API
    old_category_description = TextField(null=True) #page_description в API
    old_category_full_name = TextField(null=True)
    old_category_has_robots_nofollow = IntegerField(null=True)
    old_category_has_robots_noindex = IntegerField(null=True)
    old_category_canonical_url = CharField(max_length=500, null=True)
    old_category_is_active = IntegerField(null=True)
    old_category_is_season = BooleanField(null=True)
    old_category_seo_text = TextField(null=True)
    #-------------------------------------------------
    new_category_name = CharField(max_length=240, null=True)
    new_category_path = CharField(max_length=500, null=True)
    new_category_lvl = IntegerField(null=True)
    new_category_url = CharField(max_length=500, null=True) #full_name_slug в API
    new_category_parent_id = IntegerField(null=True)
    new_category_title = TextField(null=True) #page_title в API
    new_category_description = TextField(null=True) #page_description в API
    new_category_full_name = TextField(null=True)
    new_category_has_robots_nofollow = IntegerField(null=True)
    new_category_has_robots_noindex = IntegerField(null=True)
    new_category_canonical_url = CharField(max_length=500, null=True)
    new_category_is_active = IntegerField(null=True)
    new_category_is_season = BooleanField(null=True)
    new_category_seo_text = TextField(null=True)
    changed_fields = TextField(null=True)
    category_data_changed = DateTimeField()
    

class SiteFilterpageChanges(Model):
    filterpage_id = IntegerField() 
    old_filterpage_url = CharField(max_length=500, null=True) #slug
    old_filterpage_title = TextField(null=True) #page_title
    old_filterpage_description = TextField(null=True) #page_title
    old_filterpage_text = TextField(null=True) #page_text
    old_filterpage_name = CharField(max_length=240, null=True)
    old_filterpage_full_name = TextField(null=True)
    old_filterpage_is_active = IntegerField(null=True)
    old_filterpage_disabling_reason = CharField(max_length=240, null=True)
    old_filterpage_has_robots_nofollow = IntegerField(null=True)
    old_filterpage_has_robots_noindex = IntegerField(null=True)
    old_filterpage_canonical_url = CharField(max_length=500, null=True)
    old_filterpage_is_top = BooleanField(null=True)
    old_filterpage_is_active_changed_at = TextField(null=True)
    old_filterpage_created_at = TextField(null=True)
    old_filterpage_h1 = TextField(null=True)
    #----------------------------------------------------------------
    new_filterpage_url = CharField(max_length=500, null=True) #slug
    new_filterpage_title = TextField(null=True) #page_title
    new_filterpage_description = TextField(null=True) #page_title
    new_filterpage_text = TextField(null=True) #page_text
    new_filterpage_name = CharField(max_length=240, null=True)
    new_filterpage_full_name = TextField(null=True)
    new_filterpage_is_active = IntegerField(null=True)
    new_filterpage_disabling_reason = CharField(max_length=240, null=True)
    new_filterpage_has_robots_nofollow = IntegerField(null=True)
    new_filterpage_has_robots_noindex = IntegerField(null=True)
    new_filterpage_canonical_url = CharField(max_length=500, null=True)
    new_filterpage_is_top = BooleanField(null=True)
    new_filterpage_is_active_changed_at = TextField(null=True)
    new_filterpage_created_at = TextField(null=True)
    new_filterpage_h1 = TextField(null=True)
    changed_fields = TextField(null=True)
    filterpage_data_changed = DateTimeField(null=True) 
