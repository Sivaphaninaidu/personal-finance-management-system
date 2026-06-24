import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from expenses.models import Expense
from users.models import User


def create_expense(data):

    user = User.objects.get(id=data.user_id)

    expense = Expense.objects.create(
        user=user,
        category=data.category,
        amount=data.amount,
        date=data.date
    )

    return {
        "message": "Expense Added Successfully"
    }


def get_expenses(user_id):

    expenses = Expense.objects.filter(
        user_id=user_id
    )

    return [
        {
            "id": expense.id,
            "category": expense.category,
            "amount": float(expense.amount),
            "date": expense.date
        }
        for expense in expenses
    ]

def remove_expense(expense_id):

    expense = Expense.objects.filter(id=expense_id).first()

    if not expense:
        return {"message": "Expense Not Found"}

    expense.delete()

    return {"message": "Expense Deleted Successfully"}


def edit_expense(expense_id, data):

    expense = Expense.objects.filter(id=expense_id).first()

    if not expense:
        return {"message": "Expense Not Found"}

    expense.category = data.category
    expense.amount = data.amount
    expense.date = data.date

    expense.save()

    return {"message": "Expense Updated Successfully"}