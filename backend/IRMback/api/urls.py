from django.urls import path

from .views import CombinatorFieldsView

urlpatterns = [
    path('<pk>', CombinatorFieldsView.as_view()),
]
