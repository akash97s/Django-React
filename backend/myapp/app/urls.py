# api/urls.py

from django.urls import path
from .views import UserDataAPIView, PostDataAPIView

urlpatterns = [
    path('users/', UserDataAPIView.as_view(), name='user-data'),
    path('posts/', PostDataAPIView.as_view(), name='post-data'),
]
