from rest_framework.response import Response
from rest_framework.decorators import api_view
from flight_app.serializers import RoutSerializer,AirportSerializer,FlightSerializer
from flight_app.models import  Airline_Company
from django.http import HttpResponseRedirect
from ...utils.flights import generateFlights
import random

from geopy import distance as D
from datetime import datetime, timedelta


rout = RoutSerializer.Meta.model
airport = AirportSerializer.Meta.model
flights = FlightSerializer.Meta.model





# @api_view(['GET'])
# def search_flight(request,origin_id=0,dest_id=0, depart=None,back=None):

#     origin = airport.objects.get(id=origin_id)
#     destination = airport.objects.get(id=dest_id)

#     match1 =  flights.objects.filter(Departure_airport_id=origin,Departure_time=depart)
#     match2 = match1.filter(Arrival_airport_id=destination)
#     result = FlightSerializer(match2, many = True).data
    
#     if result == []:
#         generateFlights(origin,destination,depart)
#         return HttpResponseRedirect(request.path_info)

#         # return search_flight(origin_id,dest_id, depart,back)
       
#     if back:
#         originRtrn = airport.objects.get(id=origin_id)
#         destinationRtrn  = airport.objects.get(id=dest_id)
#         match3 = flights.objects.filter(Departure_airport_id=originRtrn,Departure_time=back)
#         match4 = match3.filter(Arrival_airport_id=destinationRtrn)
#         result2 = FlightSerializer(match4, many = True).data
#         if result2 == []:
#             generateFlights(origin,destination,back)
#             return HttpResponseRedirect(request.path_info)

#             # return search_flight(origin_id,dest_id, depart,back)
#         result2 = FlightSerializer(match4, many = True).data
#         result.append(result2)
#         print(result)
#     return Response (result)



@api_view(['GET'])
def search_flight(request,origin_id=0,dest_id=0, depart=None,back=None):

    origin = airport.objects.get(id=origin_id)
    destination = airport.objects.get(id=dest_id)

    # match1 =  flights.objects.filter(Departure_airport_id=origin,Departure_time=depart)
    # match2 = match1.filter(Arrival_airport_id=destination)
    # result = match2
    
    # if result == []:
    result = generateFlights(origin,destination,depart,back)
        # return HttpResponseRedirect(request.path_info)
    return Response (result)




