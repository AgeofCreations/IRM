from django.urls import path

from .views import (CategoryListView, CategoryDetailView,
 FilterpageListView, FilterpageDetailView,
  CategoryChangesView, FilterpageChangesView,
   CategoryChangesList, FilterpageChangesList,
   NotificationsList, CrowlerStart, NotificationsUpdate)
  

urlpatterns = [
    path('category/', CategoryListView.as_view()),
    path('category/<category_id>/', CategoryDetailView.as_view()),
    path('filterpage/', FilterpageListView.as_view()),
    path('filterpage/<filterpage_id>/', FilterpageDetailView.as_view()),
    path('changes/category/', CategoryChangesList.as_view()),
    path('changes/filterpage/', FilterpageChangesList.as_view()),
    path('changes/category/<pk>/', CategoryChangesView.as_view()),
    path('changes/filterpage/<pk>/',FilterpageChangesView.as_view()),
    path('notify/', NotificationsList.as_view()),
    path('start/category/', CrowlerStart.as_view({'post': 'category'})),
    path('start/filterpage/', CrowlerStart.as_view({'post': 'filterpage'})),
    path('notify/read/', NotificationsUpdate.as_view({'post': 'read_one'})),
    path('notify/delete/', NotificationsUpdate.as_view({'post': 'delete_one'})),


]
