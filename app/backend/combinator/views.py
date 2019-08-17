from rest_framework.mixins import  CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from combinator.models import CombinatorCols
from .serializers import CombinatorSerializer


class CombinatorFieldsView(CreateModelMixin, GenericViewSet):
    queryset = CombinatorCols
    serializer_class = CombinatorSerializer
    parser_classes = [JSONParser]

    def create(self, request, *args, **kwargs):
        first_column = str(self.request.data['first_column'])
        second_column = str(self.request.data['second_column'])
        third_column = str(self.request.data['third_column'])
        fourth_column = str(self.request.data['fourth_column'])
        fifth_column = str(self.request.data['fifth_column'])
        sixth_column = str(self.request.data['sixth_column'])
        seventh_column = str(self.request.data['seventh_column'])
        eighth_column = str(self.request.data['eighth_column']) # Преобразование из JSON-объектов в строки для обработки.

        first_handle = [i for i in first_column.split('\n') if i] or "'"
        second_handle = [i for i in second_column.split('\n') if i] or "'"
        third_handle = [i for i in third_column.split('\n') if i] or "'"
        fourth_handle = [i for i in fourth_column.split('\n') if i] or "'"
        fifth_handle = [i for i in fifth_column.split('\n') if i] or "'"
        sixth_handle = [i for i in sixth_column.split('\n') if i] or "'"
        seventh_handle = [i for i in seventh_column.split('\n') if i] or "'"
        eighth_handle = [i for i in eighth_column.split('\n') if i] or "'"#Преобразование в списки

        itog = ['{} {} {} {} {} {} {} {}'.format(x1, x2, x3, x4, x5, x6, x7, x8)
                for x1 in first_handle for x2 in second_handle for x3 in third_handle
                for x4 in fourth_handle for x5 in fifth_handle for x6 in sixth_handle for x7 in seventh_handle
                for x8 in eighth_handle]#Пересечение

        new_itog = set(itog)
        
        return Response({'result': new_itog})
