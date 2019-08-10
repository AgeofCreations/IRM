from django.db import models

# Create your models here.

class MetricsModel(models.Model):
    category_url = models.CharField(max_length=250, default="default")
    date1 = models.DateTimeField(name="Date 2")
    date2 = models.DateTimeField(name="Date 2")
    responsible = models.TextField(max_length='240')
    traffic = models.DecimalField()

    def __str__(self):
	    return self.category_url