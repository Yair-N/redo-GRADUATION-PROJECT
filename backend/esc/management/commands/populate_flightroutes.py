import json
import os

from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist
from django.core.management.base import BaseCommand

from esc.models import Airline_Company, Airport, FlightRoute

# from flight_app.utils.db_utils import dataManageUtils as dm
# from geopy import distance as D

jsonPath = "mockup data/flight_routes.json"


class Command(BaseCommand):
    def insert_data(self):
        list_len = 0
        pos = 1
        failed = 0
        print_interval = 50

        try:
            with open(jsonPath, "r", encoding="utf8") as data:
                raw_list = json.load(data)
                list_len = len(raw_list)
        except Exception as e:
            print(e)
            return None
        os.system("cls||clear")
        print(f"inserting {list_len} airports")
        for route in raw_list:
            try:
                airline = Airline_Company.objects.get(code__iexact=route["airline"])

                origin = Airport.objects.filter(iata_code__iexact=route["origin"])[0]
                destination = Airport.objects.filter(iata_code__iexact=route["target"])[
                    0
                ]

                # origin_lat_lon = (origin.lat_decimal, origin.lon_decimal)
                # dest_lat_lon = (destination.lat_decimal, destination.lon_decimal)
                # distance = D.geodesic(origin_lat_lon, dest_lat_lon).km

                FlightRoute.objects.get_or_create(
                    airline=airline,
                    origin=origin,
                    destination=destination,
                    # distance=distance,
                )
                if pos % print_interval == 0:
                    os.system("cls||clear")
                    print(f"progress {int(pos / list_len * 100)}% {pos}")
                pos += 1
            except Exception as e:
                print(
                    e,
                )
                failed += 1

    def handle(self, *args, **options):
        self.insert_data()
