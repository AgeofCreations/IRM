from django.db import models
from django.contrib.auth import get_user_model
UserModel = get_user_model()
# Create your models here.



class MetricsCategories(models.Model):
    category_url = models.CharField(max_length=250, blank=True)
    
    def __str__(self):
        return str(self.category_url)


class Month(models.Model):
    name = models.CharField(max_length=250, null=True)
    year = models.IntegerField(default=2020)
    monthly_target = models.IntegerField(blank=True, null=True)
    monthly_factual = models.IntegerField(blank=True, null=True)
    month_starts = models.CharField(max_length=250, null=True)
    month_ends = models.CharField(max_length=250, null=True)
    site_target = models.IntegerField(blank=True, null=True)
    site_factual = models.IntegerField(blank=True, null=True)
    is_now = models.BooleanField(default=True)

    def __str__(self):
        return str(self.name) + str(self.year)

class CategoriesData(models.Model):
    month = models.ForeignKey(Month, on_delete=models.DO_NOTHING, null=True)
    category_name = models.CharField(max_length=250, blank=True)
    category_plan = models.IntegerField(blank=True, null=True)
    category_factual = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.category_name)



class Week(models.Model):
    month = models.ForeignKey(Month, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(CategoriesData, on_delete=models.DO_NOTHING)
    first_day = models.CharField(max_length=250, null=True)
    last_day = models.CharField(max_length=250, null=True)
    weekly_traffic = models.IntegerField(blank=True, null=True)
    in_month = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return str(self.first_day) + str(self.category)

class MetricsToken(models.Model):
    related_user = models.ForeignKey(UserModel, on_delete=models.DO_NOTHING)
    token = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.related_user)
