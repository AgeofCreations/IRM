from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from combinator.models import CombinatorCols
from .serializers import CombinatorSerializer


class CombinatorFieldsView(CreateAPIView):
    queryset = CombinatorCols.objects.all()
    serializer_class = CombinatorSerializer


    