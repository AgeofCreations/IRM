from django.urls import path

from .views import CombinatorFieldsView

urlpatterns = [
    path('', CombinatorFieldsView.as_view()),
]
