from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
from flight_app.serializers import userSerializer, UserProfileSerializer
from rest_framework import status
import json

from flight_app.utils.constructors import serializedUser

# 'get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'

modelSerializer = userSerializer
model = get_user_model()
user_profile = UserProfileSerializer.Meta.model

# get all users / create new user
@api_view(['GET', 'POST'])
@staff_member_required
def user_list(request):
 
    if request.method == 'GET':
        # get all objects in the model user
        
        return Response(serializedUser())

    elif request.method == 'POST':
        new_obj_data = JSONParser().parse(request)
        serialized_new_obj = modelSerializer(data=new_obj_data)
        if serialized_new_obj.is_valid():
            serialized_new_obj.save()
            return Response(serialized_new_obj.data, status=status.HTTP_201_CREATED)

        return Response(modelSerializer.errors, status=status.HTTP_400_BAD_REQUEST)



# get / modify a user 
@api_view(['GET', 'PUT', 'DELETE'])
@staff_member_required
def user_detail(request, id):
    try: 
        obj = model.objects.get(id=id)
        Response(status=status.HTTP_302_FOUND)
    except model.DoesNotExist: 
        return Response({'message': f'The {model.verbose_name} does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET':
        return Response(modelSerializer(obj).data, status=status.HTTP_302_FOUND)

    elif request.method == 'PUT': 
        obj_data = JSONParser().parse(request) 
        obj_serializer = modelSerializer(obj, data=obj_data) 
        if obj_serializer.is_valid(): 
            obj_serializer.save() 
            return Response(obj_serializer.data) 
        return Response(obj_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_100_CONTINUE)
# @user_passes_test(lambda u: u.is_superuser)
