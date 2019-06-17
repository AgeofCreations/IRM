from rest_framework.generics import RetrieveAPIView

from combinator.models import CombinatorCols
from .serializers import CombinatorSerializer


class CombinatorFieldsView(RetrieveAPIView):
    queryset = CombinatorCols.objects.all()
    serializer_class = CombinatorSerializer