import random
from flight_app.models import FlightRoute, Airport, Airline_Company, Country, Flight
from django.core.management.base import BaseCommand
from django.db import connection
from flight_app.utils.db_utils import dataManageUtils as dm
from geopy import distance as D


class Command(BaseCommand):

    def generateFlights(self):
        id = 9
        while id < 943:
            flight = 0
            try:
                airline = Airline_Company.objects.get(id=id)

                country = random.choice(Country.objects.filter(
                    Name__contains=airline.Country))
                airports = country.airport_set.all()
                print(id)
            except:
                id += 1
                continue
            while flight < 20:
                try:
                    origin = random.choice(airports)
                    randomDestId = random.randint(1, 2899)
                    destination = Airport.objects.get(id=randomDestId)
                    origin_lat_lon = (origin.lat_decimal, origin.lon_decimal)
                    dest_lat_lon = (destination.lat_decimal,
                                    destination.lon_decimal)
                    distance = D.geodesic(origin_lat_lon, dest_lat_lon).km
                    print()
                    # print(airline.Name, origin.country_name,
                    #       destination.country_name, int(distance))

                    Flight.objects.create(
                        Airline_Company_Id=airline,
                        Departure_airport_id=origin,
                        Arrival_airport_id=destination,
                        Flight_Number=f'{airline.Code}{destination.id}{flight}',
                        flight_range=int(distance),
                    )
                    flight += 1
                except:
                    flight += 1
                    continue

            id += 1

    def handle(self, *args, **options):
        self.generateFlights()
