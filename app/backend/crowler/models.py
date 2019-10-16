from django.db.models import Model, IntegerField, CharField, BooleanField, DateTimeField, TextField, ManyToManyField, ForeignKey, CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model
UserModel = get_user_model()


class CrowlerCategoryModel(Model):
    category_id = IntegerField()
    category_name = CharField(max_length=240, null=True, blank=True)
    category_path = CharField(max_length=500, null=True, blank=True)
    category_lvl = IntegerField(null=True, blank=True)
    category_url = CharField(max_length=500, null=True, blank=True) #full_name_slug в API
    category_parent_id = IntegerField(null=True, blank=True)
    category_title = TextField(null=True, blank=True) #page_title в API
    category_description = TextField(null=True, blank=True) #page_description в API
    category_full_name = TextField(null=True, blank=True)
    category_has_robots_nofollow = IntegerField(null=True, blank=True)
    category_has_robots_noindex = IntegerField(null=True, blank=True)
    category_canonical_url = CharField(max_length=500, null=True, blank=True)
    category_is_active = IntegerField(null=True, blank=True)
    category_is_season = BooleanField(null=True, blank=True)
    category_seo_text = TextField(null=True, blank=True)
    category_data_updated = DateTimeField(null=True, blank=True) 
    # К data_updated привяжем уведомления о том, что категория, возможно, удалена.
    # Запилю периодическую ежедневную проверку поля со сравнением с текущими дата/время сервера.
    # Если data_updated меньше на 2 дня, то уведомление о том, что категория, возможно, удалена.
    # Ещё как вариант внеочередной парсинг и поиск в API. Если нет - перемещение в таблицу-архив. Каждое второе воскресенье очистка архивов. 
    def __str__(self):
        return self.category_name

class CrowlerFilterPageModel(Model):
    filterpage_id = IntegerField()
    filterpage_url = CharField(max_length=500, null=True, blank=True) #slug
    filterpage_title = TextField(null=True, blank=True) #page_title
    filterpage_description = TextField(null=True, blank=True) #page_title
    filterpage_text = TextField(null=True, blank=True) #page_text
    filterpage_name = CharField(max_length=240, null=True, blank=True)
    filterpage_full_name = TextField(null=True, blank=True)
    filterpage_is_active = IntegerField(null=True, blank=True)
    filterpage_disabling_reason = CharField(max_length=240, null=True, blank=True)
    filterpage_has_robots_nofollow = IntegerField(null=True, blank=True)
    filterpage_has_robots_noindex = IntegerField(null=True, blank=True)
    filterpage_canonical_url = CharField(max_length=500, null=True, blank=True)
    filterpage_is_top = BooleanField(null=True, blank=True)
    filterpage_is_active_changed_at = TextField(null=True, blank=True)
    filterpage_created_at = TextField(null=True, blank=True)
    filterpage_h1 = TextField(null=True, blank=True)
    filterpage_data_updated = DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.filterpage_name 



class SiteCategoryChanges(Model):
    category_id = IntegerField()
    old_category_name = CharField(max_length=240, null=True, blank=True)
    old_category_path = CharField(max_length=500, null=True, blank=True)
    old_category_lvl = IntegerField(null=True, blank=True)
    old_category_url = CharField(max_length=500, null=True, blank=True) #full_name_slug в API
    old_category_parent_id = IntegerField(null=True, blank=True)
    old_category_title = TextField(null=True, blank=True) #page_title в API
    old_category_description = TextField(null=True, blank=True) #page_description в API
    old_category_full_name = TextField(null=True, blank=True)
    old_category_has_robots_nofollow = IntegerField(null=True, blank=True)
    old_category_has_robots_noindex = IntegerField(null=True, blank=True)
    old_category_canonical_url = CharField(max_length=500, null=True, blank=True)
    old_category_is_active = IntegerField(null=True, blank=True)
    old_category_is_season = BooleanField(null=True, blank=True)
    old_category_seo_text = TextField(null=True, blank=True)
    #-------------------------------------------------
    new_category_name = CharField(max_length=240, null=True, blank=True)
    new_category_path = CharField(max_length=500, null=True, blank=True)
    new_category_lvl = IntegerField(null=True, blank=True)
    new_category_url = CharField(max_length=500, null=True, blank=True) #full_name_slug в API
    new_category_parent_id = IntegerField(null=True, blank=True)
    new_category_title = TextField(null=True, blank=True) #page_title в API
    new_category_description = TextField(null=True, blank=True) #page_description в API
    new_category_full_name = TextField(null=True, blank=True)
    new_category_has_robots_nofollow = IntegerField(null=True, blank=True)
    new_category_has_robots_noindex = IntegerField(null=True, blank=True)
    new_category_canonical_url = CharField(max_length=500, null=True, blank=True)
    new_category_is_active = IntegerField(null=True, blank=True)
    new_category_is_season = BooleanField(null=True, blank=True)
    new_category_seo_text = TextField(null=True, blank=True)
    changed_fields = TextField(null=True, blank=True)
    category_data_changed = DateTimeField()
    def __str__(self):
        return self.old_category_name
    

class SiteFilterpageChanges(Model):
    filterpage_id = IntegerField() 
    old_filterpage_url = CharField(max_length=500, null=True, blank=True) #slug
    old_filterpage_title = TextField(null=True, blank=True) #page_title
    old_filterpage_description = TextField(null=True, blank=True) #page_title
    old_filterpage_text = TextField(null=True, blank=True) #page_text
    old_filterpage_name = CharField(max_length=240, null=True, blank=True)
    old_filterpage_full_name = TextField(null=True, blank=True)
    old_filterpage_is_active = IntegerField(null=True, blank=True)
    old_filterpage_disabling_reason = CharField(max_length=240, null=True, blank=True)
    old_filterpage_has_robots_nofollow = IntegerField(null=True, blank=True)
    old_filterpage_has_robots_noindex = IntegerField(null=True, blank=True)
    old_filterpage_canonical_url = CharField(max_length=500, null=True, blank=True)
    old_filterpage_is_top = BooleanField(null=True, blank=True)
    old_filterpage_is_active_changed_at = TextField(null=True, blank=True)
    old_filterpage_created_at = TextField(null=True, blank=True)
    old_filterpage_h1 = TextField(null=True, blank=True)
    #----------------------------------------------------------------
    new_filterpage_url = CharField(max_length=500, null=True, blank=True) #slug
    new_filterpage_title = TextField(null=True, blank=True) #page_title
    new_filterpage_description = TextField(null=True, blank=True) #page_title
    new_filterpage_text = TextField(null=True, blank=True) #page_text
    new_filterpage_name = CharField(max_length=240, null=True, blank=True)
    new_filterpage_full_name = TextField(null=True, blank=True)
    new_filterpage_is_active = IntegerField(null=True, blank=True)
    new_filterpage_disabling_reason = CharField(max_length=240, null=True, blank=True)
    new_filterpage_has_robots_nofollow = IntegerField(null=True, blank=True)
    new_filterpage_has_robots_noindex = IntegerField(null=True, blank=True)
    new_filterpage_canonical_url = CharField(max_length=500, null=True, blank=True)
    new_filterpage_is_top = BooleanField(null=True, blank=True)
    new_filterpage_is_active_changed_at = TextField(null=True, blank=True)
    new_filterpage_created_at = TextField(null=True, blank=True)
    new_filterpage_h1 = TextField(null=True, blank=True)
    changed_fields = TextField(null=True, blank=True)
    filterpage_data_changed = DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.old_filterpage_name


class Categories(Model):
    category = CharField(max_length=100)

    def __str__(self):
        return self.category

class Responsibilities(Model):
    person = ForeignKey(UserModel, verbose_name=("User"), on_delete=CASCADE)
    responsibilities = ManyToManyField(Categories, blank=True)

    def __str__(self):
        return str(self.person)

class NotificationModel(Model):
    action_id = IntegerField(null=True, blank=True)
    category_id = IntegerField(null=True, blank=True)
    filterpage_id = IntegerField(null=True, blank=True)
    action_is = CharField(max_length=240, blank=True)
    action_subjects = TextField(null=True, blank=True)
    not_read = ManyToManyField(UserModel, related_name='not_read', blank=True)
    is_actual = ManyToManyField(UserModel,related_name='is_actual', blank=True)
    action_time = DateTimeField(default=timezone.now)
    resposive_person = ManyToManyField(UserModel,related_name='responsive_person', blank=True)
    def __str__(self):
        return self.action_is
