from django.core.management.base import BaseCommand
from users.models import User_Role

# define customized model for use as User


class Command(BaseCommand):
    args = "none"
    help = """
        this script is used to populate the database with data for User_Role
            """

    def insert_data(self):

        roles = ["anon", "esc customer", "esc supplier", "esc staff"]
        for role in roles:
            User_Role.objects.get_or_create(role_name=role)

    def handle(self, *args, **options):
        self.insert_data()
