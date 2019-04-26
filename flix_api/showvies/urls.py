from django.urls import path
from . import views

urlpatterns = [
    path('api/showvies/search', views.search),
    path('api/showvies/fetch', views.fetch),
    path('api/showvies/fetch?count=<int:count>&skip=<int:skip>', views.fetch),
]