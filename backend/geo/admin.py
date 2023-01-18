from django.contrib import admin

from .models import *


class FlightRouteAdmin(admin.ModelAdmin):

    list_display = ("code", "origin", "destination", "airline_list")
    search_fields = (
        "code",
        "origin__country__name",
        "origin__country__code",
        "origin__city",
        "origin__name",
        "destination__country__name",
        "destination__country__code",
        "destination__city",
        "destination__name",
        "airlines__code",
        "airlines__name",
    )

    @admin.display()
    def airline_list(self, obj):
        airlines = []
        for airline in obj.airlines.all():
            airlines.append(airline.name)
        return airlines


admin.site.register(Country)
admin.site.register(Airline_Company)
admin.site.register(Airport)
admin.site.register(FlattenedFlightRoutes, FlightRouteAdmin)
