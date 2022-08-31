from rest_framework.serializers import ModelSerializer,Serializer
from .models import *
from django.contrib.auth import get_user_model


class FlightsSerializer(ModelSerializer):
    
    class Meta:
        model = Flight
        fields= ['id']
        # fields = '__all__'


class CountriesSerializer(ModelSerializer):
    
    class Meta:
        model = Country
        fields= ['id', 'Name', 'Flag']



class AirportSerializer(ModelSerializer):

    class Meta:
        model = Airport
        fields = '__all__'

class airlineSerializer(ModelSerializer):

    class Meta:
        model = Airline_Company
        fields = '__all__'

class userSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ['password',]


class UserProfileSerializer(ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'


class RoutSerializer(ModelSerializer):

      class Meta:
        model = FlightRoute
        fields = '__all__'



class CustomerSerializer(ModelSerializer):
    
    class Meta:
        model = Customer
        fields = '__all__'

class FlightSerializer(ModelSerializer):

    class Meta:
        model = Flight
        fields = '__all__'


class ticketSerializer(ModelSerializer):

    class Meta:
        model= Ticket
        
        fields = '__all__'
        


