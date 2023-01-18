import random
from queue import Empty

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["POST", "GET"])
def test(request):

    return Response({"OK"}, status=status.HTTP_200_OK)
