from django.db import models
from geopy import distance as D


class Country(models.Model):
    code = models.CharField("IATA Code", max_length=2, unique=True)
    name = models.CharField("Name", max_length=20, unique=True)
    flag = models.CharField("Flag URL", max_length=200, null=True)

    class Meta:
        verbose_name = "Country"

    def __str__(self):
        return self.name


class Airport(models.Model):

    icao_code = models.CharField(max_length=4, null=True)
    iata_code = models.CharField(max_length=3, null=True)
    display_name = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=False)
    # country_name = models.CharField(max_length=20)
    lat_decimal = models.FloatField()
    lon_decimal = models.FloatField()

    class Meta:
        verbose_name = "Airport"

    def save(self, *args, **kwargs):
        self.display_name = f"{self.iata_code}|{self.country.name}|{self.city}"
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.iata_code}|{self.country.name}|{self.city}"


class Airline_Company(models.Model):
    code = models.CharField("IATA Code", max_length=2, unique=True)
    name = models.CharField("Airline Name", max_length=100, null=True)
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        verbose_name="Base Country",
        null=True,
    )
    active = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}, {self.code}"

    class Meta:
        verbose_name = "Airline"


class FlightRoute(models.Model):
    ident = models.IntegerField(verbose_name="Flight route ID", unique=True, blank=True)
    airline = models.ForeignKey(
        Airline_Company, on_delete=models.CASCADE, null=False, blank=True
    )
    origin = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        null=False,
        related_name="Origin_Airport",
        blank=True,
    )
    destination = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        null=False,
        related_name="Destination_Airport",
        blank=True,
    )
    distance = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return f"{self.airline.code} from: {self.origin.name}  to: {self.destination.name}  distance:{self.distance}"

    def save(self, *args, **kwargs):
        self.distance = D.geodesic(
            (self.origin.lat_decimal, self.origin.lon_decimal),
            (self.destination.lat_decimal, self.destination.lon_decimal),
        ).km

        self.ident = int(
            str(self.airline.id) + str(self.origin.id) + str(self.destination.id)
        )
        return super().save(*args, **kwargs)


class FlattenedFlightRoutes(models.Model):
    code = models.CharField(
        max_length=7, help_text="from to code", unique=True, blank=True
    )
    name = models.CharField(max_length=120, help_text="from to literal", blank=True)
    origin = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        null=False,
        related_name="Origin",
        blank=True,
    )
    destination = models.ForeignKey(
        Airport,
        on_delete=models.CASCADE,
        null=False,
        related_name="Destination",
        blank=True,
    )
    distance = models.IntegerField(default=0, blank=True)
    airlines = models.ManyToManyField(Airline_Company, blank=True)

    def __str__(self):
        return self.code

    def save(self, *args, **kwargs):
        self.distance = D.geodesic(
            (self.origin.lat_decimal, self.origin.lon_decimal),
            (self.destination.lat_decimal, self.destination.lon_decimal),
        ).km

        self.code = f"{self.origin.iata_code}-{self.destination.iata_code}"
        self.name = (
            f"from {self.origin.display_name} to {self.destination.display_name}"
        )
        return super().save(*args, **kwargs)

    @property
    def get_airlines(self):
        return self.airlines.all()

    class Meta:
        verbose_name = "Flight routes by airlines"
