

from django.core.management.base import BaseCommand
from flight_app.management.commands import (
populate_airlines,
populate_countries,
populate_users,
populate_airports)

class Command(BaseCommand):
    args = 'none'
    help = '''
    	this script is used to populate the database with data,
        please uncomment the data you wish to populate in the 'handle' function at the bottom
            '''
        
    def handle(self, *args, **options):
        # makemigrations.Command()
        # migrate.Command().handle()
        populate_countries.Command()
        populate_airlines.Command()
        populate_users.Command()
        populate_airports.Command()

        # print(jasonUsers())
