import requests

from django.conf import settings
from django.http import HttpResponseRedirect

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

import datetime as d

import urllib.parse


auth_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
search_offers_url = "https://test.api.amadeus.com/v2/shopping/flight-offers"

AMADEUS_API_KEY = settings.AMADEUS_API_KEY
AMADEUS_API_SECRET = settings.AMADEUS_API_SECRET

TIME_STAMP = d.datetime.now()
EXPIRES_IN = 1790

TOKEN = ""

# date for default request
FUTURE = TIME_STAMP + d.timedelta(days=14)

#departureDate format is YYYY-MM-DD
default_params = {
    'originLocationCode': 'TLV',
    'destinationLocationCode': 'AKL',
    'departureDate': TIME_STAMP.strftime("%Y-%m-%d"),
    'returnDate': FUTURE.strftime("%Y-%m-%d"),
    'adults': 2
}

# url = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=TLV&destinationLocationCode=AKL&departureDate={{departureDate}}&returnDate={{returnDate}}&adults=2&max=5"


def get_auth():
    listOfGlobals = globals()

    payload = (
        "client_id="
        + AMADEUS_API_KEY
        + "&client_secret="
        + AMADEUS_API_SECRET
        + "&grant_type=client_credentials"
    )
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    print('requesting token from amadeus')

    response = requests.request(
        "POST", auth_url, headers=headers, data=payload).json()
    if response['state'] == "approved":
        # update time stamp for token expiration
        listOfGlobals["TIME_STAMP"] = d.datetime.now()

        # update token
        listOfGlobals["TOKEN"] = response['access_token']
        print('token received', response['access_token'])

        return response['access_token']


def validate_params(_params, _default_params):

    p1_keys = set(_params.keys())
    p2_keys = set(_default_params.keys())

    same_keys = p1_keys.intersection(p2_keys)

    if same_keys == p1_keys:
        return _params
    return _default_params


@api_view(["GET"])
def search_offers(_request):
    request = _request
    now = d.datetime.now()
    delta = d.timedelta(seconds=-EXPIRES_IN)
    
    params = validate_params(request.GET.dict(), default_params)

    # check if TIME_STAMP is less than (now() - 1790 second) or TOKEN is empty, if so - get_auth is used to get a new token
    is_expired = TIME_STAMP < now + delta

    if is_expired or TOKEN == "":
        print('no token found or token expired')

        get_auth()
        # resend the request internally to make sure everything is up to date
        return HttpResponseRedirect(request.path_info + '?' + urllib.parse.urlencode(params))

    print(params)
    headers = {"Authorization": 'Bearer ' + TOKEN}

    response = requests.request(
        "GET", search_offers_url, headers=headers, params=params
    )

    return Response(response.json(), status=status.HTTP_200_OK)
    # return Response({'status':'ok'}, status=status.HTTP_200_OK)
