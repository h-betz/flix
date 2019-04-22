from django.urls import path
from . import views

urlpatterns = [
    path('api/showvies/search', views.search),
    path('api/showvies/fetch', views.fetch)
]