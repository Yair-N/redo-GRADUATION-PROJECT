import json
import operator
from functools import reduce

from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from django.db.models import Q

from geo.models import Airline_Company, Country

# define customized model for use as User

jsonPath = "static/mockup data/airlines.json"

# json structure
# {
#     "ident": "AGGH",
#     "type": "large_airport",
#     "name": "Honiara International Airport",
#     "latitude_deg": -9.428,
#     "longitude_deg": 160.054993,
#     "iso_country": "SB",
#     "municipality": "Honiara",
#     "iata_code": "HIR",
# }


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for airlines
            """

    def insert_data(self):

        try:
            with open(jsonPath, "r", encoding="utf8") as data:
                raw_list = json.load(data)
        except Exception as e:
            print(e)
            return None

        for airline in raw_list:

            try:
                country = Country.objects.get(name__iexact=airline["Country"])
            except ObjectDoesNotExist:
                query = reduce(
                    operator.or_,
                    (Q(name__icontains=x) for x in list(airline["Country"].split(" "))),
                )
                # print(query)
                try:
                    if country := Country.objects.filter(query):
                        country = country[0]
                        # print(country[0])
                    else:
                        # print(airline["Country"])
                        continue
                except ObjectDoesNotExist:

                    print("after icontains", e, airline["Country"])
                # except MultipleObjectsReturned:
                #     country =
            try:
                Airline_Company.objects.get_or_create(
                    code=airline["IATA"],
                    name=airline["Name"],
                    country=country,
                )
            except IntegrityError:
                pass

    def handle(self, *args, **options):
        self.insert_data()
