from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *


class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "full_name",
        "role",
        "contact_display",
        "phone_display",
        "avatar",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
        "contact_info",
    )

    @admin.display()
    def display_name(self, obj):
        return obj.user.last_name + " " + obj.user.first_name

    @admin.display()
    def email(self, obj):
        return obj.user.email

    @admin.display(ordering="user__username")
    def username(self, obj):
        return obj.user.username

    @admin.display(
        ordering="user__last_name",
        description="Name",
    )
    def full_name(self, obj):
        return obj.user.last_name + " " + obj.user.first_name

    @admin.display(
        description="Address",
    )
    def contact_display(self, obj):
        address = ""
        for key in obj.contact_info["address"].keys():
            address = address + " " + str(obj.contact_info["address"][key])
        return address

    @admin.display(
        description="Phone",
    )
    def phone_display(self, obj):

        return obj.contact_info["phone number"]


admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(User_Role)
