from django.db import models

# Create your models here.
class CrowlerCategoryModel(models.Model):
    category_id = models.IntegerField()
    category_name = models.TextField(max_length=240)
    category_url = models.TextField(max_length=500)
    category_title = models.CharField()
    category_description = models.CharField()
    has_robots_nofollow = models.IntegerField()
    has_robots_noindex = models.IntegerField()
    canonical_url = models.TextField(max_length=500)
    seo_text = models.CharField()

    def __str__(self):
        return self.category_name


