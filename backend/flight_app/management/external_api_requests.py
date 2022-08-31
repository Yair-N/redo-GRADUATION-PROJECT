import requests
import json


def getCountries():
    countriesURL = 'https://restcountries.com/v3.1/all'
    countries = []
    try:
        res = requests.get(countriesURL, timeout=2.5)
        temp = json.loads(res.text)
    except Exception as e:
        print(e)
        return None
    for country in temp:

        newCountry = {
            "name": country["name"]["common"],
            "code": country['cca2'],
            "flag": country['flags']['svg']
        }

        countries.append(newCountry)

    return countries


def aviationStack(getFlights=False, getAirlines=False, offset=0):
    API_KEY = '3661344527566d771864a56ac763580d'
    AIRLINE_URL = 'https://api.aviationstack.com/v1/airlines'
    parma = {
        'access_key': API_KEY,
        'limit': 100,
        'offset': offset
    }
    if getAirlines:
        airlines = []
        try:
            res = requests.get(AIRLINE_URL, params=parma, timeout=2.5)
            temp = json.loads(res.text)
        except Exception as e:
            print(e)
            return None
        for airline in temp.data:

            newAirline = {
                "airline_name": airline["airline_name"],
                "country_iso2": airline["country_iso2"],
                "status": airline["status"]
            }

            airlines.append(newAirline)

        return airlines


def jsonAirlines(jsonPath='flight_app/management/airliners.json'):
    try:
        with open(jsonPath, 'r', encoding="utf8") as data:
            raw = json.load(data)
    except Exception as e:
        print(e)
        return None

    airlines = []

    for airline in raw:
        if airline["active"] == 'Y':
            newAirline = {
                "code": airline["iata"],
                "airline_name": airline["name"],
                "country": airline["country"],
            }
            airlines.append(newAirline)
    return airlines


def jasonUsers(jsonPath='flight_app/management/muckupusers.json',mediaPath=''):
    try:
        with open(jsonPath, 'r', encoding="utf8") as data:
            raw = json.load(data)
    except Exception as e:
        print(e)
        return None

    users = []
    '''
    standard Django USER Fields

    id, password, username, first_name, last_name
    email, is_staff, is_active, is_superuser

    '''
    for user in raw:
        newUser = {
            'username': user["username"],
            'password': '123456',
            'first_name': user["first_name"],
            'last_name':user["last_name"],
            'email': user["email"],
            'photo': mediaPath + user["picture"],
            'address': user["location"],
            'Phone': user["phone_number"],
        }
        users.append(newUser)

    return users
