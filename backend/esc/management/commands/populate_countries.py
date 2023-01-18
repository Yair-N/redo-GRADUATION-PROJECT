import json

import requests
from django.core.management.base import BaseCommand

from geo.models import Country

# define customized model for use as User

countriesURL = "https://restcountries.com/v3.1/all"


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for User_Role
            """

    def insert_data(self):

        try:
            res = requests.get(countriesURL, timeout=2.5)
            countries = json.loads(res.text)
        except Exception as e:
            print(e)
            return None

        for country in countries:
            Country.objects.get_or_create(
                name=country["name"]["common"],
                code=country["cca2"],
                flag=country["flags"]["svg"],
            )

    def handle(self, *args, **options):
        self.insert_data()
