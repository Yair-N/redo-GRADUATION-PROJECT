from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
from flight_app.models import Customer, Flight, User, Airline_Company, User_Role, Airport, UserProfile
from flight_app.serializers import FlightSerializer, airlineSerializer
from django.contrib.auth.decorators import user_passes_test
from rest_framework import status

from flight_app.utils.constructors import constructAirlineSerialized
from ...utils.flights import generateFlights

import json


modelSerializer = airlineSerializer
model = modelSerializer.Meta.model


@api_view(['GET'])
def airline_list(request):

    # get all objects in the model airline_companies
    result = model.objects.all()
    serialized = modelSerializer(result, many=True)
    return Response(serialized.data)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def flight_list(request):

    flightData = request.data
    airline = model.objects.get(id=flightData['airline'])
    # print(airline.Name)
    if request.method == 'POST':
        origin = Airport.objects.get(id=flightData["origin"])
        destination = Airport.objects.get(id=flightData["destination"])

        generateFlights(origin, destination,
                        flightData["depart"], flights=1, airline=airline)

    flights = airline.flight_set.all()
    return Response(FlightSerializer(flights, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_airline(request):

    user_id =  request.user.id

    result = constructAirlineSerialized(user_id)

    return Response(result, status=status.HTTP_200_OK)
