from django.db import models
from geo.models import Airline_Company, FlattenedFlightRoutes
from users.models import UserProfile
import datetime
from django.utils import timezone


class Customer(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)


class Supplier(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)


class Flight(models.Model):

    flight_route = models.ForeignKey(
        FlattenedFlightRoutes, on_delete=models.CASCADE, blank=True
    )

    airline = models.ForeignKey(Airline_Company, on_delete=models.CASCADE, blank=True)

    depart_sched = models.DateTimeField(default=timezone.now, blank=True)
    duration = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        blank=True,
        verbose_name="hours",
    )
    arrive_calculated = models.DateTimeField(null=True, blank=True)
    flight_number = models.CharField(max_length=120, blank=True, unique=True)
    available_tickets = models.IntegerField(default=380, blank=True)
    flight_range = models.IntegerField(default=0, blank=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.flight_number)

    def save(self, *args, **kwargs):
        # made up speed to calculate duration
        average_speed = 650
        self.flight_range = self.flight_route.distance
        self.duration = self.flight_route.distance / average_speed
        self.arrive_calculated = self.depart_sched + datetime.timedelta(
            minutes=self.duration
        )
        self.flight_number = (
            self.airline.code
            + self.flight_route.code
            + str(self.depart_sched.strftime("%Y-%m-%d %H:%M"))
        )
        return super().save(*args, **kwargs)


class Booking(models.Model):
    flight = models.ManyToManyField(Flight)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    passengers = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pk}, {self.flight}, {self.customer}"
