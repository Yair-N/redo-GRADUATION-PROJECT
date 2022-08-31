from django.core.management.base import BaseCommand
from flight_app.models import Airline_Company
from flight_app.management.external_api_requests import jsonAirlines

class Command(BaseCommand):
    args = 'none'
    help = '''
    	this script is used to populate the database with data,
        please uncomment the data you wish to populate in the 'handle' function at the bottom
            '''    
    
    def setAirlines(self):

        # with open("base/management/countries.json", 'r') as data:
        #     countries = json.load(data)
        airlines = jsonAirlines()
        
        for airline in airlines:
            try:

                
                temp = Airline_Company(
                    code = airline["code"],
                    Name=airline["airline_name"],
                    Country=airline["country"])
                temp.save()
            except Exception as e: print(e)



    def handle(self, *args, **options):
        self.setAirlines()