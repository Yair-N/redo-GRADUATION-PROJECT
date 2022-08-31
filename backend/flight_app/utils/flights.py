from flight_app.serializers import RoutSerializer, AirportSerializer, FlightSerializer
from flight_app.models import Airline_Company

import random

from geopy import distance as D
from datetime import datetime, timedelta


rout = RoutSerializer.Meta.model
airport = AirportSerializer.Meta.model
flights_obj = FlightSerializer.Meta.model


# for Demo purpose if not matching flights
# it will generate flights according to request
def generateFlights(origin, destination, depart, back, flights=15, airline=None):
    flight_list = []
    all_airlines = Airline_Company.objects.all()
    i = 0
    origin_lat_lon = (origin.lat_decimal, origin.lon_decimal)
    dest_lat_lon = (destination.lat_decimal,
                    destination.lon_decimal)
    distance = int(D.geodesic(origin_lat_lon, dest_lat_lon).km)
    while i < flights:
        id = random.randint(1, 942)
        # if not airline:
        airline = Airline_Company.objects.get(id=id)
        if distance > 500:
            range = random.randrange(distance, distance+int(distance*.2))
        toTrip = flights_obj.objects.create(
            Airline_Company_Id=airline,
            Departure_airport_id=origin,
            Arrival_airport_id=destination,
            Flight_Number=f'{airline.Code}{destination.id}{i}',
            Remaining_Tickets=random.randint(30, 100),
            flight_range=range,
            Departure_time=depart
        )
        if back:
            returnTrip = flights_obj.objects.create(
                Airline_Company_Id=airline,
                Departure_airport_id=origin,
                Arrival_airport_id=destination,
                Flight_Number=f'{airline.Code}{destination.id}{i}',
                Remaining_Tickets=random.randint(30, 100),
                flight_range=range,
                Departure_time=back
        )
            flight_list.append({'to': FlightSerializer(toTrip).data,
                    'from': FlightSerializer(returnTrip).data})
        else:
             flight_list.append({'to': FlightSerializer(toTrip).data,
                    'from':{}})
        i += 1
    return flight_list
