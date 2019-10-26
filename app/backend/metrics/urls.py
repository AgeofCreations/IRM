from django.urls import path

from .views import MonthView, WeekView, CategoriesList

urlpatterns = [
    path('month/', MonthView.as_view({'post': 'show_month'})),
    path('test_tasks/', MonthView.as_view({'post': 'test_task'})),
    path('categories/list/', CategoriesList.as_view({'get': 'list'})),
    path('week/<pk>', WeekView.as_view()),
]
