from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

'''
standard Django USER Fields

id, password, username, first_name, last_name
email, is_staff, is_active, is_superuser

'''

# custom User for Flight app
# update settings.py AUTH_USER_MODEL = 'flight_app.User'
# register the model in the app’s admin.py


class User_Role(models.Model):
    Role_Name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.Role_Name


class User(AbstractUser):
    email = models.EmailField('user email', max_length=240, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    User = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    Role = models.ForeignKey(
        User_Role, on_delete=models.CASCADE, default=2, null=True)
    Photo = models.ImageField(upload_to='images', null=True)
    Address = models.JSONField(default={
                               "state": "", "city": "", "street": "", "postcode": 0}, verbose_name='address')
    Phone_No = models.CharField(max_length=20, default=0)

    def __str__(self):
        return f' ID: {self.User.id}, NAME: {self.User}, ROLE: {self.Role}, Photo: {self.Photo},  Address: {self.Address}, Phone: {self.Phone_No}'

    class Meta:
        verbose_name = 'Profile'


class Customer(models.Model):
    User_Id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    Credit_Card_No = models.CharField(max_length=50)

    def __str__(self):
        return f'USER: {self.User_Id}, 4 digits: {str(self.Credit_Card_No)[-4:]}'


class Country(models.Model):
    Code = models.CharField(max_length=2, unique=True)
    Name = models.TextField(max_length=20, unique=True)
    Flag = models.TextField(max_length=200, null=True)

    class Meta:
        verbose_name = 'Country'

    def __str__(self):
        return self.Name


class Airline_Company(models.Model):
    Code = models.CharField(max_length=2, unique=True)
    Name = models.TextField(max_length=100, null=True)
    Country = models.TextField(max_length=20, null=True)
    User_Id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    Is_Active = models.BooleanField(default=True)

    def __str__(self):
        return self.pk, self.Code


class Airport(models.Model):

    icao_code = models.CharField(max_length=4)
    iata_code = models.CharField(max_length=3)
    display_name = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    country_id = models.ForeignKey(
        Country, on_delete=models.CASCADE, null=False)
    country_name = models.CharField(max_length=50, null=False)
    lat_decimal = models.FloatField()
    lon_decimal = models.FloatField()

    class Meta:
        verbose_name = 'Airport'

    def __str__(self):
        return f'{self.iata_code}|{self.country_name}|{self.city}'


class FlightRoute(models.Model):
    airline = models.ForeignKey(
        Airline_Company, on_delete=models.CASCADE, null=False)
    origin = models.ForeignKey(
        Airport, on_delete=models.CASCADE, null=False, related_name='Origin_Airport')
    destination = models.ForeignKey(
        Airport, on_delete=models.CASCADE, null=False, related_name='Destination_Airport')
    distance = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.airline.Code} from: {self.origin}  to: {self.destination}  distance:{self.distance}'


class Flight(models.Model):
    Airline_Company_Id = models.ForeignKey(
        Airline_Company, on_delete=models.CASCADE)
    # Origin_Country_Id = models.ForeignKey(
    #     Country, null=False, on_delete=models.CASCADE, related_name='Origin_Country_Id')
    # Destination_Country_Id = models.ForeignKey(
    #     Country, null=False, on_delete=models.CASCADE, related_name='Destination_Country_Id')
    Departure_airport_id = models.ForeignKey(
        Airport, null=False, on_delete=models.CASCADE, related_name='Origin_airport_Id')
    Arrival_airport_id = models.ForeignKey(
        Airport, null=False, on_delete=models.CASCADE, related_name='Destination_airport_Id')
    Departure_time = models.DateTimeField(null=True)
    Landing_time = models.DateTimeField(null=True)
    Flight_Number = models.CharField(max_length=20)
    Remaining_Tickets = models.IntegerField(default=100)
    flight_range = models.IntegerField(default=0)


class Ticket(models.Model):
    Flight = models.ForeignKey(Flight, on_delete=models.CASCADE, null=False)
    Customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, null=False)
    Seats = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.pk}, {self.Flight}, {self.Customer}'
