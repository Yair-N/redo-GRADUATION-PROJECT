import json

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from esc.management.commands import populate_roles
from users.models import User_Role, UserProfile

# define customized model for use as User
User = get_user_model()
jsonPath = "mockup data/users.json"


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for users and user profiles
            """

    def insert_data(self):
        try:
            User.objects.create_superuser("yair", "yair.notkovich@gmail.com", "wbstbh")
        except:
            pass


    def handle(self, *args, **options):
        populate_roles.Command().handle()
        self.insert_data()
