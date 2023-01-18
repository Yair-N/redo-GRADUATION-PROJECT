from django.urls import path

from .views import *

urlpatterns = [
    path("airline_list/", airline_list, name="airline_list"),
    path("airline_routes/", airline_routes, name="airline_routes"),
    # path('get_airline_private/',
    #      get_airline, name='create_flight'),
]
