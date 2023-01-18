import json

from django.core.management.base import BaseCommand

from esc.models import Country

# define customized model for use as User


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for User_Role
            """

    def __init__(self):
        self.miss_match = []

    def check_countries_match(self, airlines_json_path=r"mockup data/airlines.json"):
        try:
            with open(airlines_json_path, "r", encoding="utf8") as data:
                raw_list = json.load(data)

            for airline in raw_list:
                country_name = airline["Country"]
                try:
                    result = Country.objects.get(name__iexact=country_name)
                    print(f"\033[92m OK {result}\033[92m")
                # except Country.MultipleObjectsReturned:
                #     print(f'\033[91m{airline["Country"]}\033[91m')
                #     # self.miss_match.append[country_name]
                #     continue
                except Exception as e:
                    try:
                        result = Country.objects.get(name__icontains=country_name)
                        print(f"\033[94m{result}\033[94m")
                    except Exception as e:
                        print(e, country_name)

                    continue
            print(self.miss_match)
        except Exception as e:
            print(e)

    def handle(self, *args, **options):
        self.check_countries_match()
