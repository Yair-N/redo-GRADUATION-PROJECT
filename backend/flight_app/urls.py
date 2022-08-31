from flight_app.views.general_views import locations
from flight_app.views.test import *
from django.urls import path, include

urlpatterns = [
    path('general/fetch_countries/',
         locations.all_countries, name='countries_list'),

    path('general/fetch_airports/<int:id>/',
         locations.all_airports, name='airports_list'),

    path('system/', include('flight_app.views.admin.urls'), name='admin_ops'),
    path('auth/', include('flight_app.views.auth.urls'), name='auth_ops'),
    path('user/', include('flight_app.views.user.urls'), name='user_ops'),
    path('supplier/', include('flight_app.views.supplier_views.urls'),
         name='airline_ops'),
    path('flight_search/', include('flight_app.views.flight_search.urls'),
         name='flight_search'),



    path('',test , name='test_ops'),

    # path('all_flights/', views.all_flights),airline_detail/
    # path('test', calcRange.calcRange)
    # path('adduser/', .addUser),airline_list
]
