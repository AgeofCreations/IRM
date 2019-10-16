from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import APITestCase, force_authenticate
from django.contrib.auth.models import Group, User



from combinator.views import CombinatorFieldsView

# Create your tests here.
# вывод вьюхи    "test1 test2 test3 ' ' test6 ' test8"


class TestCombinatorView(APITestCase):
    @classmethod
    def setUpData(cls):
        user = User(username="TestUser", email="testuser@gmail.com", password="TestUser")
        user.save()

    def test_combinator_output(self):
        url = reverse('combinator')
        combinator_input = [
            {
            "first_column": "test1",
            "second_column": "test2",
            "third_column": "test3",
            "fourth_column": "",
            "fifth_column": "",
            "sixth_column": "test6",
            "seventh_column": "",
            "eighth_column": ""
            }
        ]

        # token = Token.objects.get(user__username='TestUser')
        # self.client.credentials(HTTP_AUTHORIZATION='Token' + token.key)
        self.client.force_authenticate(user=user)
        request = self.client.post(url, combinator_input, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['result'], "test1 test2 test3 ' ' test6 ' test8")

