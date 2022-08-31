from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from django.contrib.auth import get_user_model
from django.apps import apps
from flight_app.utils.authUtils import get_user_permissions_by_group

appConf = apps.get_app_config('flight_app')
FlightAppGroup = appConf.get_model('user_groups')

models = appConf.get_models()


@admin.register(FlightAppGroup)
class FlightAppGroupAdmin(admin.ModelAdmin):
    list_display= ('app_username','group','user_permissions')
    list_display_links=('app_username',)

    def app_username(self, obj):
        return get_user_model().objects.get(id = obj.user_id).username
    
    def group(self,obj):
        pass

    def user_permissions(self,obj):
        return get_user_permissions_by_group(obj.group_id)

admin.site.register(models)

