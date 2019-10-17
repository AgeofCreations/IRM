from django.urls import path
from .views import EmailVerification, GroupsView

urlpatterns = [
    path('admin/verificate_user/', EmailVerification.as_view({'post': 'update'})),
    path('admin/groups/', GroupsView.as_view({'get': 'groups_list'})),
    path('admin/groups/update/', GroupsView.as_view({'post': 'update'})),

]
