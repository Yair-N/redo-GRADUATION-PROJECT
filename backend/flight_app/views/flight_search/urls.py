from django.urls import path
from .test import search_flight
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('anon/<int:origin_id>/<int:dest_id>/',
         search_flight, name='test'),
         path('anon/<int:origin_id>/<int:dest_id>/<depart>/',
         search_flight, name='test'),
    path('anon/<int:origin_id>/<int:dest_id>/<depart>/<back>/',
         search_flight, name='test'),

   

]
