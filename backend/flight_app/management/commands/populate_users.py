from pickle import FALSE
from django.core.management.base import BaseCommand
# from backend.settings import AUTH_USER_MODEL as User
from django.contrib.auth import get_user_model
from flight_app.models import UserProfile, User_Role, Customer, Airline_Company
from flight_app.management.external_api_requests import jasonUsers
from django.contrib.auth.hashers import make_password

User = get_user_model()

class Command(BaseCommand):
    args = 'none'
    help = '''
    	this script is used to populate the database with data,
        please uncomment the data you wish to populate in the 'handle' function at the bottom
            '''
    def setRoles(self):
        roles=['Admin','Customer','Airline']
        for role in roles:
            User_Role.objects.get_or_create(Role_Name=role)

    def setHumans(self, pairAirline=FALSE):
        '''
        standard Django USER Fields

        id, password, username, first_name, last_name
        email, is_staff, is_active, is_superuser
        '''
        role_customer = User_Role.objects.get(Role_Name='Customer')
        role_airline = User_Role.objects.get(Role_Name='Airline')
        try:
            User.objects.create_superuser('yair','yair.notkovich@gmail.com','wbstbh')
        except: pass
        persons = jasonUsers()
        for i, person in enumerate(persons):
            try:
                User.objects.create_user(
                    username=person['username'] ,
                    password=person['password'] ,
                    first_name=person['first_name'] ,
                    last_name=person['last_name'] ,
                    email=person['email'] ,
                )
            except Exception as e:print(e)
            finally:
                print('stage 1')
                user = User.objects.get(username=person['username'])
                # if is an airline
                
                try:
                    profile = UserProfile.objects.create(User=user, Photo=person['photo'])
                    if i%3 ==0:
                        # print('stage airline')

                        profile.Role = role_airline
                        profile.save()
                        airline = Airline_Company.objects.get(id = i)
                        airline.User_Id = user
                        airline.save()

                    else:
                        # print('customer')

                        profile.Role = role_customer
                        customer = Customer()
                        customer.User_Id=user
                        customer.Address=person['address']
                        customer.Credit_Card_No=person['Phone']
                        customer.Phone_No=person['Phone']
                        profile.save()
                        customer.save()
                except Exception as e:print(e)

    def updateUserPasswords(self):
        persons = jasonUsers()
        for person in persons:
            User.objects.filter(username__iexact=person['username']).update(password =make_password('123a456b') )

        print(f'total users:{len(User.objects.all())}\n total customers:{len(Customer.objects.all())}\n total profiles {len(UserProfile.objects.all())}')
    def handle(self, *args, **options):
        # self.setRoles()
        # self.setHumans()
        # print(jasonUsers())
        # self.updateUserPasswords()
        User.objects.filter(username__iexact='smallbird985').update(password =make_password('123a456b') )