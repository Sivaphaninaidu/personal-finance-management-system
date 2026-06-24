import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from fastapi import APIRouter
from collections import defaultdict

from accounts.models import Account
from transactions.models import Transaction
from bills.models import Bill
from expenses.models import Expense
from goals.models import Goal
from budgets_app.models import Budget

router = APIRouter()


@router.get("/")
def dashboard(user_id: int):

    total_accounts = Account.objects.filter(
        user_id=user_id
    ).count()

    total_balance = sum(
        float(acc.balance)
        for acc in Account.objects.filter(
            user_id=user_id
        )
    )

    total_budgets = Budget.objects.filter(
    user_id=user_id
).count()

    total_transactions = Transaction.objects.filter(
        account__user_id=user_id
    ).count()

    total_bills = Bill.objects.filter(
        user_id=user_id
    ).count()

    total_expenses = sum(
        float(exp.amount)
        for exp in Expense.objects.filter(
            user_id=user_id
        )
    )

    total_goals = Goal.objects.filter(
        user_id=user_id
    ).count()

    latest_account = Account.objects.filter(
        user_id=user_id
    ).order_by("-id").first()

    latest_transaction = Transaction.objects.filter(
        account__user_id=user_id
    ).order_by("-id").first()

    latest_bill = Bill.objects.filter(
        user_id=user_id
    ).order_by("-id").first()

    latest_expense = Expense.objects.filter(
        user_id=user_id
    ).order_by("-id").first()

    latest_goal = Goal.objects.filter(
        user_id=user_id
    ).order_by("-id").first()

    notifications = []

    if total_balance < 5000:
        notifications.append(
            "⚠ Low Balance Alert"
        )

    for bill in Bill.objects.filter(
        user_id=user_id
    ):
        notifications.append(
            f"🧾 Bill Pending: {bill.bill_name}"
        )

    for goal in Goal.objects.filter(
        user_id=user_id
    ):
        if goal.saved_amount >= goal.target_amount:
            notifications.append(
                f"🎯 Goal Achieved: {goal.goal_name}"
            )

    return {
        "total_accounts": total_accounts,
        "total_balance": round(total_balance, 2),
        "total_transactions": total_transactions,
        "total_bills": total_bills,
        "total_expenses": round(total_expenses, 2),
        "total_goals": total_goals,
        "total_budgets": total_budgets,

        "avg_balance":
            round(
                total_balance / total_accounts,
                2
            ) if total_accounts else 0,

        "avg_expense":
            round(
                total_expenses / total_transactions,
                2
            ) if total_transactions else 0,

        "latest_account":
            latest_account.account_name
            if latest_account else "No Accounts",

        "latest_transaction":
            latest_transaction.transaction_type
            if latest_transaction else "No Transactions",

        "latest_bill":
            latest_bill.bill_name
            if latest_bill else "No Bills",

        "latest_expense":
            latest_expense.category
            if latest_expense else "No Expenses",

        "latest_goal":
            latest_goal.goal_name
            if latest_goal else "No Goals",

        "notifications": notifications
    }


@router.get("/expense-chart")
def expense_chart(user_id: int):

    chart_data = defaultdict(float)

    for exp in Expense.objects.filter(
        user_id=user_id
    ):
        chart_data[exp.category] += float(exp.amount)

    return [
        {
            "name": category,
            "value": amount
        }
        for category, amount in chart_data.items()
    ]

@router.get("/monthly-summary")
def monthly_summary(user_id: int):

    from collections import defaultdict

    income = defaultdict(float)
    expense = defaultdict(float)

    transactions = Transaction.objects.filter(
        account__user_id=user_id
    )

    for tx in transactions:

        month = tx.date.strftime("%b")

        if tx.transaction_type.lower() == "credit":
            income[month] += float(tx.amount)

        elif tx.transaction_type.lower() == "debit":
            expense[month] += float(tx.amount)

    months = sorted(
        set(list(income.keys()) + list(expense.keys()))
    )

    return [
        {
            "month": month,
            "income": income[month],
            "expense": expense[month]
        }
        for month in months
    ]


@router.get("/balance-history")
def balance_history(user_id: int):

    transactions = Transaction.objects.filter(
        account__user_id=user_id
    ).order_by("date")

    balance = 0

    history = []

    for tx in transactions:

        if tx.transaction_type.lower() == "credit":
            balance += float(tx.amount)

        elif tx.transaction_type.lower() == "debit":
            balance -= float(tx.amount)

        history.append({
            "date": tx.date.strftime("%d-%b"),
            "balance": balance
        })

    return history    