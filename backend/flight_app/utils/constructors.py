

from flight_app.models import Customer, User, Airline_Company
from flight_app.serializers import CustomerSerializer, FlightSerializer, UserProfileSerializer, airlineSerializer,userSerializer,ticketSerializer



def serializedCustomers(customersRaw: list):
    customers = []
    for customer in customersRaw:
        user = customer.User_Id
        profile = user.userprofile
        serialized_user = userSerializer(user).data
        serialized_profile = UserProfileSerializer(profile).data
        serialized_customer = CustomerSerializer(customer).data
        serialized_customer.update(serialized_profile)
        serialized_customer.update(serialized_user)
        customers.append(serialized_customer)
    return customers


def serializedUser(id :int=None ):
    if id:
        rawUsers = User.objects.get(id = id)
    else:
        rawUsers = User.objects.all()

    users = []
    for user in rawUsers:
        try:
            profile = user.userprofile
        except: continue
        serialized_user = userSerializer(user).data
        serialized_profile = UserProfileSerializer(profile).data
        serialized_profile.update(serialized_user)
        users.append(serialized_profile)
    return users

def constructAirlineSerialized(user_id: int):

    tickets = []
    customers = []
    airline = Airline_Company.objects.get(User_Id = user_id)
    flights = airline.flight_set.all()
    for flight in flights:
        flight_tickets = flight.ticket_set.all()
        for ticket in flight_tickets:
            tickets.append(ticket)
            customers.append(ticket.Customer)
    
    serializedAirline = airlineSerializer(airline).data
    serializedFlights = FlightSerializer(flights,many=True).data
    serializedTickets = ticketSerializer(tickets,many=True).data
    
    return {'airline':serializedAirline,'flights':serializedFlights,'tickets':serializedTickets,'customers':serializedCustomers(customers)}
