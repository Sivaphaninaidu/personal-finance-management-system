from django.db import models
from users.models import User

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=30)
    card_type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.account_name