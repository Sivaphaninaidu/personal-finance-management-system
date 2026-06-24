import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from transactions.models import Transaction
from accounts.models import Account
from decimal import Decimal


def create_transaction(data):

    account = Account.objects.get(
        id=data.account_id
    )

    amount = Decimal(str(data.amount))

    if data.transaction_type.lower() == "credit":

        account.balance += amount

    elif data.transaction_type.lower() == "debit":

        if account.balance < amount:
            return {
                "message": "Insufficient Balance"
            }

        account.balance -= amount

    account.save()

    transaction = Transaction.objects.create(
        account=account,
        transaction_type=data.transaction_type,
        amount=amount,
        date=data.date
    )

    return {
        "message": "Transaction Added Successfully"
    }


def get_transactions(user_id):

    transactions = Transaction.objects.filter(
        account__user_id=user_id
    )

    return [
        {
            "id": t.id,
            "account_id": t.account.id,
            "account": t.account.account_name,
            "transaction_type": t.transaction_type,
            "amount": float(t.amount),
            "date": t.date
        }
        for t in transactions
    ]


def remove_transaction(transaction_id):

    transaction = Transaction.objects.filter(id=transaction_id).first()

    if not transaction:
        return {
            "message": "Transaction Not Found"
        }

    transaction.delete()

    return {
        "message": "Transaction Deleted Successfully"
    }


def edit_transaction(transaction_id, data):

    transaction = Transaction.objects.filter(id=transaction_id).first()

    if not transaction:
        return {
            "message": "Transaction Not Found"
        }

    account = Account.objects.filter(id=data.account_id).first()

    if not account:
        return {
            "message": "Account Not Found"
        }

    transaction.account = account
    transaction.transaction_type = data.transaction_type
    transaction.amount = data.amount
    transaction.date = data.date

    transaction.save()

    return {
        "message": "Transaction Updated Successfully"
    }