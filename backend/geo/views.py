from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import *

# Create your views here.
airline_serializer = AirlineSerializer
airline_model = airline_serializer.Meta.model

airport_serializer = AirportSerializer
airport_model = AirportSerializer.Meta.model


@api_view(["GET"])
def airport_list(request):
    # get all objects in the model airport_model
    result = airport_model.objects.all()
    serialized = airport_serializer(result, many=True)
    return Response(serialized.data)


@api_view(["GET"])
def airline_list(request):

    # get all objects in the model airline_companies
    result = airline_model.objects.all()
    serialized = airline_serializer(result, many=True)
    return Response(serialized.data)


@api_view(["GET"])
def airline_routes(request):
    params = request.query_params

    if request.query_params == {}:
        return Response(
            {"No search item was given"},
            status=status.HTTP_404_NOT_FOUND,
        )
    keys = params.keys()
    if "airline" in keys:

        try:
            obj = airline_model.objects.get(code=params["airline"])
            Response(status=status.HTTP_302_FOUND)

        except airline_model.DoesNotExist:

            return Response(
                {
                    "message": f"The {airline_model._meta.verbose_name} you searched does not exist"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        result = FlattenedFlightRoutesSerializer.Meta.model.objects.filter(airlines=obj)

        return Response(
            FlattenedFlightRoutesSerializer(result, many=-True).data,
            status=status.HTTP_200_OK,
        )
    if "from" in keys:

        if "to" in keys:
            try:
                result = FlattenedFlightRoutesSerializer.Meta.model.objects.filter(
                    code__iexact=f'{params["from"]}-{params["to"]}'
                )
                print(f'{params["from"]}-{params["to"]}')
            except airline_model.DoesNotExist:

                return Response(
                    {
                        "message": f"The {airline_model._meta.verbose_name} you searched does not exist"
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            try:
                result = FlattenedFlightRoutesSerializer.Meta.model.objects.filter(
                    code__istartswith=params["from"]
                )

            except airline_model.DoesNotExist:

                return Response(
                    {
                        "message": f"The {airline_model._meta.verbose_name} you searched does not exist"
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(
            FlattenedFlightRoutesSerializer(result, many=-True).data,
            status=status.HTTP_200_OK,
        )
