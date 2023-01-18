from django.conf import settings
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *



class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user','bookings')

    @admin.display()
    def bookings(self, obj):
        bookings = obj.booking_set.all()
        # print(customer)
        # return bookings.id
        return "%s"% (" ".join(booking.flight for booking in bookings))

class FlightsAdmin(admin.ModelAdmin):
    list_display=('airline_name','origin_city','destination_city', 'sched','seats','duration')
    
    @admin.display(description="With")
    def airline_name(self, obj):
        return obj.airline.name

    @admin.display(description="from")
    def origin_city(self, obj):
        return obj.flight_route.origin.city

    @admin.display(description="to")
    def destination_city(self, obj):
        return obj.flight_route.destination.city

    @admin.display(description="on")
    def sched(self, obj):
        return obj.depart_sched
    
    @admin.display(description="seats")
    def seats(self, obj):
        return obj.available_tickets

    @admin.display(description="length")
    def duration_hours(self, obj):
        return str(int(obj.duration/60))+"."+str(int(obj.duration%60/60*100))+" hrs"
# admin.site.register(User, UserAdmin)
# admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Customer,CustomerAdmin)
# admin.site.register(Country)
# admin.site.register(Airline_Company)
# admin.site.register(Airport)
admin.site.register(Flight,FlightsAdmin)
# admin.site.register(FlightRoute)
# admin.site.register(FlattenedFlightRoutes)
admin.site.register(Booking)
