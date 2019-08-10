from django.db import models
from django.utils import timezone

# Create your models here.

class CombinatorCols(models.Model):
	first_column = models.TextField("Column 1", null=True, blank=True)
	second_column = models.TextField("Column 2", null=True, blank=True)
	third_column = models.TextField("Column 3", null=True, blank=True)
	fourth_column = models.TextField("Column 4", null=True, blank=True)
	fifth_column = models.TextField("Column 5", null=True, blank=True)
	sixth_column = models.TextField("Column 6", null=True, blank=True)
	seventh_column = models.TextField("Column 7", null=True, blank=True)
	eighth_column = models.TextField("Column 8", null=True, blank=True)
	result = models.TextField("Result", blank=True,)
	account_owner = models.CharField(max_length=250, default="default")
	operation_datetime = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.first_column
