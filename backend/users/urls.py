from django.urls import path

from .views import *

urlpatterns = [
    path("userprofile/", profileDetail, name="profile_detail"),
    path("upload_image/", uploadPicture, name="profile_detail"),
    # path("book_flight/<int:flight>/<int:seats>/", book_flight, name="profile_detail"),
]
