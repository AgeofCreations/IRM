"""IRMback URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path, include
from rest_auth.registration.views import VerifyEmailView, RegisterView
from rest_auth.views import UserDetailsView
from django.conf.urls.static import static
from combinator import urls
from crowler import urls
import notifications.urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('combinator/', include('combinator.urls')),
    path('crowler/', include('crowler.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
    name='account_confirm_email'),
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(),
    name='account_email_verification_sent'),
    path('rest-auth/user/', UserDetailsView.as_view(), name='user_detail_view'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
