

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
    def __init__(self):
        self.populate_countries=populate_countries.Command()
        self.populate_airlines=populate_airlines.Command()
        self.populate_users=populate_users.Command()
        self.populate_airports = populate_airports.Command()
    def handle(self, *args, **options):
        # makemigrations.Command()
        # migrate.Command().handle()
        # self.setRoles()
        self.populate_countries.handle()
        self.populate_airlines.handle()
        self.populate_users.handle()
        self.populate_airports.handle()

        # print(jasonUsers())
