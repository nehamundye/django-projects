from django.urls import path

from . import views

app_name = "mathquiz"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:questionId>/<str:option_number>", views.checkanswer, name="checkanswer"),
    path("replay", views.replay, name="replay")
]
