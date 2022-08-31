from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
from flight_app.models import User, Airline_Company, User_Role
from flight_app.serializers import airlineSerializer
from django.contrib.auth.decorators import user_passes_test
from rest_framework import status
import json

# 'get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'

modelSerializer = airlineSerializer
model = modelSerializer.Meta.model


# get all airline_companies / create new airline company
@api_view(['GET', 'POST', 'DELETE'])
@staff_member_required
def airline_list(request):
    # modelSerializer = airlineSerializer
    # model = modelSerializer.Meta.model

    if request.method == 'GET':
        # get all objects in the model airline_companies
        result = model.objects.all()

        # get object by name if given
        obj_name = request.query_params.get('Name', None)
        if obj_name is not None:
            result = result.filter(Name__icontains=obj_name)

        return Response(modelSerializer(result, many=True).data)

    elif request.method == 'POST':
        new_obj_data = JSONParser().parse(request)
        serialized_new_obj = modelSerializer(data=new_obj_data)
        if serialized_new_obj.is_valid():
            serialized_new_obj.save()
            return Response(serialized_new_obj.data, status=status.HTTP_201_CREATED)

        return Response(modelSerializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET', 'PUT', 'DELETE'])
@staff_member_required
def airline_detail(request, id):
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
