from flight_app.models import FlightRoute, Airport, Airline_Company
from django.core.management.base import BaseCommand
from django.db import connection
from flight_app.utils.db_utils import dataManageUtils as dm
from geopy import distance as D


class Command(BaseCommand):
    def setFlightRoutes(self):

        flightRoutes = dm.cleanFlightRoutsWithPandas(r'flight_app\management\commands\flight_routes.csv')

        for route in flightRoutes:
            try:
                airline = Airline_Company.objects.get(code__iexact=route['airline'])
                origin = Airport.objects.get(iata_code__iexact=route["origin"])
                destination = Airport.objects.get(iata_code__iexact=route["destination"])
                origin_lat_lon =(origin.lat_decimal, origin.lon_decimal)
                dest_lat_lon = (destination.lat_decimal, destination.lon_decimal)
                distance=D.geodesic(origin_lat_lon,dest_lat_lon ).km

                FlightRoute.objects.get_or_create(
                    airline=airline,
                    origin= origin,
                    destination=destination,
                    distance=distance
                )

            except Exception as e:
                print(e)

    def handle(self, *args, **options):
        self.setFlightRoutes()
