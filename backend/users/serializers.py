from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model


class userSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = [
            "password",
        ]


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
