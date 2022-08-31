from django.core.management.base import BaseCommand
from flight_app.models import Country
from flight_app.management.external_api_requests import getCountries

class Command(BaseCommand):
    args = 'none'
    help = '''
    	this script is used to populate the database with data,
        please uncomment the data you wish to populate in the 'handle' function at the bottom
            '''    
    
    def setCountries(self):

        # with open("base/management/countries.json", 'r') as data:
        #     countries = json.load(data)
        countries = getCountries()
       
        for country in countries:
            try:
                Country.objects.get_or_create(Name=country['name'], Code=country['code'], Flag = country['flag'])
                
            except: print('Check if countries already has data')



    def handle(self, *args, **options):
        self.setCountries()