from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.admin.views.decorators import staff_member_required
from django.views import View
from flight_app.models import Country, Airport, User, Airline_Company,User_Role
from flight_app.serializers import *
import json

http_method_names = ['get', 'post', 'put', 'delete'] #, 'patch', 'head', 'options', 'trace']


@api_view(http_method_names)
@staff_member_required
def countryList(request, id=None):
    model = Country
    modelSerializer = CountriesSerializer

    if request.method == 'get' and not id:
        return Response(modelSerializer(model.objects.all(), many = True).data)

    elif request.method == 'get' and id:
        return Response(modelSerializer(model.objects.filter(id = id), many = True).data)

    if request.method == 'post':
        try:
            get, create = model.objects.get_or_create(request.body)
            if get:
                return Response(json.dumps(f'this {model.verbose_name} already exists'))
            if create:
                return Response(json.dumps(f'{model.verbose_name} created successfully'))

            else: return Response(json.dumps(f'creating {model.verbose_name} failed'))
        except Exception as e:
            return Response(json.dumps(e))

    if request.method == 'put':
        pass
    if request.method == 'delete':
        pass

@api_view(http_method_names)
@permission_classes[IsAuthenticated]
@staff_member_required
def airport(request):
    model = Airport

    if request.method == 'get':
        pass
    if request.method == 'post':
        pass
    if request.method == 'put':
        pass
    if request.method == 'delete':
        pass


@api_view(http_method_names)
@permission_classes[IsAuthenticated]
@staff_member_required
def airline_Company(request):
    model = Airline_Company

    if request.method == 'get':
        pass
    if request.method == 'post':
        pass
    if request.method == 'put':
        pass
    if request.method == 'delete':
        pass


@api_view(http_method_names)
@permission_classes[IsAuthenticated]
@staff_member_required
def user(request):
    model = User

    if request.method == 'get':
        pass
    if request.method == 'post':
        pass
    if request.method == 'put':
        pass
    if request.method == 'delete':
        pass


@api_view(http_method_names)
@permission_classes[IsAuthenticated]
@staff_member_required
def user_Role(request):
    model = User_Role

    if request.method == 'get':
        pass
    if request.method == 'post':
        pass
    if request.method == 'put':
        pass
    if request.method == 'delete':
        pass



