from django.db import models
from users.models import User

class Bill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bill_name = models.CharField(max_length=100)
    description = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()

    def __str__(self):
        return self.bill_name