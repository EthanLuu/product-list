from django.urls.conf import re_path
from . import views

urlpatterns = [
    re_path(r'([0-9]+)$', views.get_or_edit),
    re_path(r'categories$', views.get_categories),
    re_path(r'categorymap$', views.get_category_map),
    re_path(r'brands$', views.get_brands),
    re_path(r'$', views.rest)
]
