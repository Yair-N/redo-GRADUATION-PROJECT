

from queue import Empty
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.auth import get_user_model
from flight_app.serializers import FlightSerializer, UserProfileSerializer, userSerializer, ticketSerializer
from rest_framework import status
from flight_app.models import Airline_Company, Customer, Flight, Ticket, UserProfile, User
from flight_app.utils.constructors import constructAirlineSerialized


@api_view(['POST', 'GET'])
def test(request):
    # customers =Customer.objects.all()
    flights = list(Flight.objects.all())

    # # for flight in flights:
    # i=0
    # while i < 6:
    #     customer = random.choice(customers)
    #     seats = random.randint(1,6)
    #     available = flight.Remaining_Tickets
    #     if seats <= available:
    #         flight.Remaining_Tickets = available-seats
    #         flight.save()
    #         ticket = Ticket.objects.create(Flight=flight,Customer=customer,Seats=seats)
    #     i+=1
    #     print(ticket)

    customer = Customer.objects.get(User_Id_id=1)
    seats = random.randint(1, 6)
    i = 0
    while i < 6:
        # customer = random.choice(customers)
        flight = random.choice(flights)

        seats = random.randint(1,6)
        available = flight.Remaining_Tickets
        if seats <= available:
            flight.Remaining_Tickets = available-seats
            flight.save()
            ticket = Ticket.objects.create(Flight=flight,Customer=customer,Seats=seats)
        i+=1

    return Response({},status=status.HTTP_200_OK)