import django_filters

from .models import CrowlerFilterPageModel


class FilterpageFilter(django_filters.FilterSet):
    def __init__(self, *args, **kwargs):
        super(FilterpageFilter, self).__init__(*args, **kwargs)
        self.fields['filterpage_url'].label = "New Email Label"
    class Meta:
        model = CrowlerFilterPageModel
        fields = {'filterpage_url': ['exact', 'icontains']}