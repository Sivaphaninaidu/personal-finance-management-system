import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from bills.models import Bill
from users.models import User


def create_bill(data):

    user = User.objects.get(id=data.user_id)

    bill = Bill.objects.create(
        user=user,
        bill_name=data.bill_name,
        description=data.description,
        amount=data.amount,
        due_date=data.due_date
    )

    return {
        "message": "Bill Added Successfully"
    }


def get_bills(user_id):

    bills = Bill.objects.filter(
        user_id=user_id
    )

    return [
        {
            "id": bill.id,
            "bill_name": bill.bill_name,
            "description": bill.description,
            "amount": float(bill.amount),
            "due_date": bill.due_date
        }
        for bill in bills
    ]

def remove_bill(bill_id):

    bill = Bill.objects.filter(id=bill_id).first()

    if not bill:
        return {"message": "Bill Not Found"}

    bill.delete()

    return {"message": "Bill Deleted Successfully"}


def edit_bill(bill_id, data):

    bill = Bill.objects.filter(id=bill_id).first()

    if not bill:
        return {"message": "Bill Not Found"}

    bill.bill_name = data.bill_name
    bill.description = data.description
    bill.amount = data.amount
    bill.due_date = data.due_date

    bill.save()

    return {"message": "Bill Updated Successfully"}