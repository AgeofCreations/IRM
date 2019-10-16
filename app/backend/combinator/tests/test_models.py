from django.test import TestCase
from combinator.models import CombinatorCols
from django.utils import timezone

class CombinatorModelTest(TestCase):
    def test_str(self):
        combinator = CombinatorCols(
            first_column="test",
            second_column="test2",
            account_owner="1",
            operation_datetime=timezone.now())
        self.assertEqual(combinator.__str__(), 'test')