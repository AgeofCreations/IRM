from django.urls import path

from .views import MonthView, CategoriesList, MetricsTokenView, RunTasks, CategoryDataRetrieveView

urlpatterns = [
    path('month/', MonthView.as_view({'post': 'show_month'})),
    path('category_data/<pk>/', CategoryDataRetrieveView.as_view()),
    path('run-tasks/collect-data/', RunTasks.as_view({'post': 'collect_data'})),
    path('run-tasks/create-dates/', RunTasks.as_view({'post': 'create_dates'})),
    path('categories/list/', CategoriesList.as_view({'get': 'categories_list'})),
    path('categories/list/update/', CategoriesList.as_view({'post': 'update'})),
    path('categories/third_level/update/', CategoriesList.as_view({'post': 'third_level_update'})),
    path('add/category/', MonthView.as_view({'post': 'add_category_data'})),
    path('add/monthly/', MonthView.as_view({'post': 'add_month_data'})),
    path('token/', MetricsTokenView.as_view({'get': 'show', 'post': 'update'})),
]
