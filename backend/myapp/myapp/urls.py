# myapi/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/app/', include('app.urls')),  # Include the app API URLs
    path('api/charts-api/', include('charts_api.urls')),  # Include the charts API URLs
]
