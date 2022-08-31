
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from flight_app.models import Country,Airport
from flight_app.serializers import CountriesSerializer,AirportSerializer
from geopy import distance as D


@api_view(['GET'])
def all_countries(r):
    countries = CountriesSerializer(Country.objects.all(), many=True)
    return Response(countries.data)

@api_view(['GET'])
def all_airports(r, id):
    rawAirports = Airport.objects.all()
    if id != 0:
        try:
            origin = Airport.objects.get(id = id)
            origin_lon = origin.lon_decimal
            origin_lat = origin.lat_decimal
            airportsByRange = []

            for destination in rawAirports:
                dest_lon = destination.lon_decimal
                des_lat = destination.lat_decimal
                range = D.geodesic((origin_lat,origin_lon),(des_lat,dest_lon)).km
               
                tempAirport={
                    'id':destination.id,
                    'iata_code':destination.iata_code,
                    'name':destination.name,
                    'city':destination.city,
                    'country_name': destination.country_name,
                    'country_id':destination.country_id.id,
                    'range':int(range)
                }
                airportsByRange.append(tempAirport)
            return Response(json.dumps(airportsByRange))
        except Exception as e:print(e)
    else:
        airports = rawAirports
        return Response(AirportSerializer(airports, many=True).data)





