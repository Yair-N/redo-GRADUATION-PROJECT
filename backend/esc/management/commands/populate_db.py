# define customized model for use as User
import populate_airports
import populate_countries
import populate_human
import populate_roles
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for User_Role
            """

    def handle(self, *args, **options):
        populate_roles.Command().handle()
        populate_human.Command().handle()
        populate_countries.Command().handle()
        populate_airports.Command().handle()
