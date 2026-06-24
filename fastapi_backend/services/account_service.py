import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from accounts.models import Account
from users.models import User


def create_account(data):

    user = User.objects.get(id=data.user_id)

    account = Account.objects.create(
        user=user,
        account_name=data.account_name,
        account_number=data.account_number,
        card_type=data.card_type,
        balance=data.balance
    )

    return {
        "message": "Account Created Successfully",
        "account_name": account.account_name
    }


def get_accounts(user_id):

    accounts = Account.objects.filter(
        user_id=user_id
    )

    return [
        {
            "id": acc.id,
            "account_name": acc.account_name,
            "account_number": acc.account_number,
            "card_type": acc.card_type,
            "balance": float(acc.balance)
        }
        for acc in accounts
    ]

def remove_account(account_id):

    account = Account.objects.filter(id=account_id).first()

    if not account:
        return {
            "message": "Account Not Found"
        }

    account.delete()

    return {
        "message": "Account Deleted Successfully"
    }

def edit_account(account_id, data):

    account = Account.objects.filter(id=account_id).first()

    if not account:
        return {"message": "Account Not Found"}

    account.account_name = data.account_name
    account.account_number = data.account_number
    account.card_type = data.card_type
    account.balance = data.balance

    account.save()

    return {
        "message": "Account Updated Successfully"
    }