
from django.urls import path
from .airlines import airline_list, flight_list,get_airline
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('airline_list/',
         airline_list, name='airline_list'),

    path('create_flight/',
         flight_list, name='create_flight'),

    path('get_airline_private/',
         get_airline, name='create_flight'),

]
