# from email.policy import default
from django.conf import settings
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.db import models
from geopy import distance as D

# custom User model to allow email sign instead of user


class User(AbstractUser):

    email = models.EmailField("user email", max_length=240, unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username",
    ]

    def __str__(self):
        return str(self.email)


class User_Role(models.Model):
    role_name = models.CharField(max_length=15, unique=True)

    def __str__(self) -> str:
        return self.role_name


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.ForeignKey(
        User_Role, on_delete=models.CASCADE, default=1, null=True, verbose_name="Role"
    )

    avatar = models.ImageField("Avatar", upload_to="avatars", null=True, blank=True)

    def contact_default():
        return {
            "phone number": "",
            "address": {
                "street": "",
                "city": "",
                "state": "",
                "postcode": "",
            },
        }

    def favorites_default():
        return {}

    contact_info = models.JSONField("Contact Info", default=contact_default, blank=True)

    favorite = models.JSONField("Favorites", default=favorites_default, blank=True)

    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    class Meta:
        verbose_name = "Profile"

    # @property
    # @admin.display(
    #     description="Name",
    # )
    # def full_name(self):
    #     return self.user.last_name + " " + self.user.first_name

    # @property
    # @admin.display(
    #     description="Address",
    # )
    # def contact_display(self):
    #     address = ""
    #     for key in self.contact_info["address"].keys():
    #         address = address + " " + str(self.contact_info["address"][key])
    #     return address

    # @property
    # @admin.display(
    #     description="Phone",
    # )
    # def phone_display(self):

    #     return self.contact_info["phone number"]
