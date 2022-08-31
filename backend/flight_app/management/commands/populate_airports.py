from flight_app.models import Airport, Country
from django.core.management.base import BaseCommand
from django.db import connection
from flight_app.utils.db_utils import dataManageUtils as dm



class Command(BaseCommand):
    def setAirports(self):

        _airports = dm.cleanAirportsWithPandas(r'flight_app\management\commands\airport_db.csv')

        for airport in _airports:
            try:
                country = Country.objects.get(Name__iexact=airport['country'])
                Airport.objects.get_or_create(
                icao_code=airport['icao_code'],#0
                iata_code=airport['iata_code'], #1
                name= airport['name']  ,    #2
                city= airport['city'] ,    #3
                country_id=country ,  #4
                country_name=airport['country'],
                lat_decimal =airport['lat_decimal'],#14
                lon_decimal=airport['lon_decimal'], #15
                )
            except Exception as e: input(f'''{airport['country']},{e}''')

    def updateDisplayName(self):
        airports = Airport.objects.all()
        for airport in airports:
            airport.display_name = f'{airport.city} ({airport.iata_code})'
            airport.save()
    def handle(self, *args, **options):
        # self.setAirports()
        self.updateDisplayName()