from django.urls import path
from .amadeus import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('flight/',
         search_offers, name='test'),

    path("""flight/<str:originLocationCode>/
         <str:destinationLocationCode>/
         <str:departureDate>/
         <str:returnDate>/
         <int:adults>/
         """,
         search_offers, name='test'),
]
