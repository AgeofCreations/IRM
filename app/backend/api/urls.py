from django.urls import path
from .views import EmailVerification

urlpatterns = [
    path('admin/verificate_user/', EmailVerification.as_view({'post': 'update'})),
]
