from django.urls import path

from .views import MonthView, CategoriesList, MetricsTokenView

urlpatterns = [
    path('month/', MonthView.as_view({'post': 'show_month'})),
    path('test_tasks/', MonthView.as_view({'post': 'test_task'})),
    path('categories/list/', CategoriesList.as_view({'get': 'categories_list'})),
    path('categories/list/update/', CategoriesList.as_view({'post': 'update'})),
    path('add/category/', MonthView.as_view({'post': 'add_category_data'})),
    path('add/monthly/', MonthView.as_view({'post': 'add_month_data'})),
    path('token/', MetricsTokenView.as_view({'get': 'show', 'post': 'update'})),
]
