from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, signUp

urlpatterns = [
    path("authenticate/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("authenticate/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", signUp, name="SignUp"),
]
