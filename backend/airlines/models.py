# # from email.policy import default
# from django.conf import settings
# from django.db import models
# from geo.models import Country
# # custom User model to allow email sign instead of user


# class Airline_Company(models.Model):
#     code = models.CharField("IATA Code", max_length=2, unique=True)
#     name = models.CharField("Airline Name", max_length=100, null=True)
#     country = models.ForeignKey(
#         Country,
#         on_delete=models.CASCADE,
#         verbose_name="Base Country",
#         null=True,
#     )
#     # user = models.ForeignKey(
#     #     settings.AUTH_USER_MODEL,
#     #     on_delete=models.CASCADE,
#     #     null=True,
#     #     verbose_name="Manager ID",
#     # )
#     active = models.BooleanField(default=True)
#     updated = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.name}, {self.code}"

#     class Meta:
#         verbose_name = "Airline"
