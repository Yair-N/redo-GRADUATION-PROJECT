from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

from .models import *


class AirlineSerializer(ModelSerializer):
    class Meta:
        model = Airline_Company
        fields = "__all__"


class FlightRouteSerializer(ModelSerializer):
    class Meta:
        model = FlightRoute
        fields = "__all__"


class FlattenedFlightRoutesSerializer(ModelSerializer):
    class Meta:
        model = FlattenedFlightRoutes
        fields = "__all__"
