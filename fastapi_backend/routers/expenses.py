from fastapi import APIRouter

from schemas.expense_schema import ExpenseSchema

from services.expense_service import (
    create_expense,
    get_expenses,
    remove_expense,
    edit_expense
)

router = APIRouter()


@router.post("/")
def add_expense(data: ExpenseSchema):
    return create_expense(data)


@router.get("/")
def expenses(user_id: int):
    return get_expenses(user_id)

@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    return remove_expense(expense_id)


@router.put("/{expense_id}")
def update_expense(expense_id: int, data: ExpenseSchema):
    return edit_expense(expense_id, data)