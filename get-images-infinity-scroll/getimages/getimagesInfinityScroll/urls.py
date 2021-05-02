from django.urls import path

from . import views

app_name = "getimagesInfinityScroll"
urlpatterns = [
    path("", views.index, name="index"),
]