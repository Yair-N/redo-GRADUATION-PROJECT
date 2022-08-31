from django.urls import path
from . import airline
from . import user
urlpatterns = [


    path('airline-list/',
         airline.airline_list, name='airline_list'),

    path('airline-detail/<id>',
         airline.airline_detail, name='airline_detail'),
#     path('general/fetch_airports/<int:id>/',
#          locations.all_airports, name='airports_list'),
    path('user-list/',
         user.user_list, name='user_list'),

    # path('all_flights/', views.all_flights),airline_detail/
    # path('test', calcRange.calcRange)
    # path('adduser/', .addUser),airline_list
]
