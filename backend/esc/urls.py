from django.urls import include, path

from .views import *

urlpatterns = [
    path("", test, name="test_ops"),
    path("airlines/", include("geo.urls"), name="airline_ops"),
    # path("user/", include("users.urls"), name="user_ops"),
    path("auth/", include("users.auth.urls"), name="authentication"),
]
