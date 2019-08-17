from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from .models import CrowlerCategoryModel, CrowlerFilterPageModel, SiteCategoryChanges, SiteFilterpageChanges
from .serializers import CrowlerCategorySerizalizer, CrowlerFilterpageSerizalizer, CategoryChangesSerializer, FilterpageChangesSerializer
from crowler import tasks

class CrowlerCategoriesListView(CreateModelMixin, GenericViewSet):
    queryset = CrowlerCategoryModel
    serializer_class = CrowlerCategorySerizalizer
    parser_classes = [JSONParser]
    
