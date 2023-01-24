from .models import *
from .serializers import UserProfileSerializer, userSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status

# from rest_framework.parsers import JSONParser

user_model = get_user_model()


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profileDetail(request):
    try:
        user = user_model.objects.get(id=request.user.id)
        profile = user.userprofile
        # customer = user.customer_set.all()
        # if customer.exists():
        #     try:
        #         bookings = customer[0].ticket_set.all()
        #         for booking in bookings:
        #             flight = booking.Flight
        #             flights.append(flight)
        #     except:
        #         pass

        Response(status=status.HTTP_302_FOUND)
    except user_model.DoesNotExist:
        return Response(
            {"message": f"The {profile._meta.verbose_name} does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        # return combined serialized data from user and user profile
        serialized_user = userSerializer(user).data
        # try:

        #     serialized_bookings = ticketSerializer(bookings, many=True).data
        #     serialized_profile.update({"bookings": serialized_bookings})
        # except:
        #     pass
        serialized_profile = UserProfileSerializer(profile).data
        # serialized_flights = FlightSerializer(flights, many=True).data
        serialized_profile.update(serialized_user)
        # serialized_profile.update({"flights": serialized_flights})
        # print(serialized_flights)
        return Response(serialized_profile, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        user.first_name = request.data["first_name"]
        user.last_name = request.data["last_name"]
        profile.Address = request.data["Address"]
        profile.Phone_No = request.data["Phone_No"]

        if user and profile:
            user.save()
            profile.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def uploadPicture(request):
    try:
        user = user_model.objects.get(id=request.user.id)
        profile = user.userprofile
        Response(status=status.HTTP_302_FOUND)
    except user_model.DoesNotExist:
        return Response(
            {"message": f"The {profile._meta.verbose_name} does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    new_photo = profile.Photo = request.data["Photo"]

    if new_photo:
        profile.save()
        serialized_profile = UserProfileSerializer(profile)
        return Response(serialized_profile.data, status=status.HTTP_202_ACCEPTED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
