import json

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from esc.models import UserProfile


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["email"] = user.email
        token["username"] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def signUp(request):
    user_credentials = request.data
    try:
        if get_user_model().objects.filter(email=user_credentials["email"]).exists():
            return Response(
                data={f"Email already exists"}, status=status.HTTP_409_CONFLICT
            )
        get_user_model().objects.create_user(
            email=user_credentials["email"],
            password=user_credentials["password"],
            username=user_credentials["email"],
        )
        # UserProfile.objects.create(User = new_user)

        return Response(data={"success"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(data={f"exception:{e}"}, status=status.HTTP_409_CONFLICT)
