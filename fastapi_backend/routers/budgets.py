from fastapi import APIRouter

from schemas.budget_schema import BudgetSchema

from services.budget_service import (
    create_budget,
    get_budgets,
    remove_budget,
    edit_budget
)

router = APIRouter()


@router.post("/")
def add_budget(data: BudgetSchema):
    return create_budget(data)


@router.get("/")
def budgets(user_id: int):
    return get_budgets(user_id)


@router.delete("/{budget_id}")
def delete_budget(budget_id: int):
    return remove_budget(budget_id)


@router.put("/{budget_id}")
def update_budget(
    budget_id: int,
    data: BudgetSchema
):
    return edit_budget(
        budget_id,
        data
    )

@router.get("/analysis")
def budget_analysis(user_id: int):

    from budgets_app.models import Budget
    from expenses.models import Expense

    result = []

    budgets = Budget.objects.filter(
        user_id=user_id
    )

    for budget in budgets:

        spent = sum(
            float(exp.amount)
            for exp in Expense.objects.filter(
                user_id=user_id,
                category=budget.category
            )
        )

        remaining = (
            float(budget.budget_amount)
            - spent
        )

        result.append({
            "category": budget.category,
            "budget": float(
                budget.budget_amount
            ),
            "spent": spent,
            "remaining": remaining,
            "status":
                "Over Budget"
                if remaining < 0
                else "Within Budget"
        })

    return result