

from django.urls import path
from .user_view import profile_detail,upload_picture,book_flight
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('userprofile/',
         profile_detail, name='profile_detail'),

    path('upload_image/',
         upload_picture, name='profile_detail'),

     path('book_flight/<int:flight>/<int:seats>/',
         book_flight, name='profile_detail'),

]
