import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from budgets_app.models import Budget
from users.models import User


def create_budget(data):

    user = User.objects.get(
        id=data.user_id
    )

    Budget.objects.create(
        user=user,
        category=data.category,
        budget_amount=data.budget_amount
    )

    return {
        "message": "Budget Added Successfully"
    }


def get_budgets(user_id):

    budgets = Budget.objects.filter(
        user_id=user_id
    )

    return [
        {
            "id": budget.id,
            "category": budget.category,
            "budget_amount": float(
                budget.budget_amount
            )
        }
        for budget in budgets
    ]


def remove_budget(budget_id):

    budget = Budget.objects.filter(
        id=budget_id
    ).first()

    if not budget:
        return {
            "message": "Budget Not Found"
        }

    budget.delete()

    return {
        "message": "Budget Deleted Successfully"
    }


def edit_budget(budget_id, data):

    budget = Budget.objects.filter(
        id=budget_id
    ).first()

    if not budget:
        return {
            "message": "Budget Not Found"
        }

    budget.category = data.category
    budget.budget_amount = data.budget_amount

    budget.save()

    return {
        "message": "Budget Updated Successfully"
    }