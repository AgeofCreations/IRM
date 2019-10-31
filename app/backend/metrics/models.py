from django.db import models
from django.contrib.auth import get_user_model
UserModel = get_user_model()
# Create your models here.



class MetricsCategories(models.Model):
    category_url = models.CharField(max_length=250, blank=True)
    
    def __str__(self):
        return self.category_url


class Month(models.Model):
    name = models.CharField(max_length=250, null=True)
    year = models.IntegerField(default=2020)
    monthly_target = models.IntegerField(default=0)
    monthly_factual = models.IntegerField(blank=True, null=True)
    month_starts = models.CharField(max_length=250, null=True)
    month_ends = models.CharField(max_length=250, null=True)
    site_prev = models.IntegerField(default=0)
    site_factual = models.IntegerField(blank=True, null=True)
    site_multiplication_percentage = models.IntegerField(default=30)
    is_now = models.BooleanField(default=True)


    def __str__(self):
        return self.name + ' ||| ' + str(self.year)

class CategoriesData(models.Model):
    month = models.ForeignKey(Month, on_delete=models.CASCADE, null=True)
    category_name = models.CharField(max_length=250, blank=True)
    category_plan = models.IntegerField(default=0)
    category_factual = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.category_name



class Week(models.Model):
    month = models.ForeignKey(Month, on_delete=models.CASCADE)
    category = models.ForeignKey(CategoriesData, on_delete=models.CASCADE)
    first_day = models.CharField(max_length=250, null=True)
    last_day = models.CharField(max_length=250, null=True)
    weekly_traffic = models.IntegerField(blank=True, null=True)
    in_month = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return str(self.category)+ ' ||| ' + self.first_day + ' to ' + self.last_day

class MetricsToken(models.Model):
    related_user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    token = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.related_user)


class ThirdLevelCategories(models.Model):
    head_category = models.ForeignKey(MetricsCategories, on_delete=models.CASCADE)
    child_category = models.CharField(max_length=500,blank=True, null=True)

    def __str__(self):
        return str(self.child_category)


class ThirdLevelCategoriesData(models.Model):
    month_category = models.ForeignKey(CategoriesData, on_delete=models.CASCADE, null=True, related_name="third_level")
    child_category = models.CharField(max_length=500,blank=True, null=True)
    child_category_traffic = models.IntegerField(blank=True, null=True, default=0)

    def __str__(self):
        return str(self.child_category)

class ThirdLevelWeeks(models.Model):
    child_category_data = models.ForeignKey(ThirdLevelCategoriesData, on_delete=models.CASCADE, related_name="weeks")
    first_day = models.CharField(max_length=250, null=True)
    last_day = models.CharField(max_length=250, null=True)
    weekly_traffic = models.IntegerField(default=0)
    in_month = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return str(self.child_category_data)+ ' ||| ' + str(self.first_day)+ ' to ' + str(self.last_day)
