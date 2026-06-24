from fastapi import APIRouter

from schemas.transaction_schema import TransactionSchema

from services.transaction_service import (
    create_transaction,
    get_transactions,
    remove_transaction,
    edit_transaction
)

router = APIRouter()


@router.post("/")
def add_transaction(data: TransactionSchema):
    return create_transaction(data)


@router.get("/")
def transactions(user_id: int):
    return get_transactions(user_id)

@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int):
    return remove_transaction(transaction_id)


@router.put("/{transaction_id}")
def update_transaction(
    transaction_id: int,
    data: TransactionSchema
):
    return edit_transaction(transaction_id, data)