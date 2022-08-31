from pickle import FALSE
from queue import Empty
from django.core.management.base import BaseCommand
# from backend.settings import AUTH_USER_MODEL as User
from django.contrib.auth import get_user_model
from flight_app.models import UserProfile, User_Role, Customer, Airline_Company
from flight_app.management.external_api_requests import jasonUsers
from django.contrib.auth.hashers import make_password
from flight_app.serializers import CustomerSerializer
User = get_user_model()


class Command(BaseCommand):
    def update_user(self):
        persons = jasonUsers()
        for person in persons:
            user = User.objects.get(username = person['username'] )
            profile = user.userprofile
            if profile :               
                profile.Address = person['address']
                profile.Phone_No = person['Phone']
                profile.save()
    def handle(self, *args, **options):
        self.update_user()
        