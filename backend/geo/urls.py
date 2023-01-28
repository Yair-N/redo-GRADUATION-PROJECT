from django.urls import path

from .views import *

urlpatterns = [
    path("airline_list/", airline_list, name="airline_list"),
    path("airport_list/", airport_list, name="airport_list"),
    path("airline_routes/", airline_routes, name="airline_routes"),
]
