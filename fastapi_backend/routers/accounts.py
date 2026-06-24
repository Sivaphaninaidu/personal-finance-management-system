from fastapi import APIRouter

from schemas.account_schema import AccountSchema

from services.account_service import (
    create_account,
    get_accounts,
    remove_account,
    edit_account
)

router = APIRouter()

@router.post("/")
def add_account(data: AccountSchema):
    return create_account(data)


@router.get("/")
def accounts(user_id: int):
    return get_accounts(user_id)

@router.delete("/{account_id}")
def delete_account(account_id: int):
    return remove_account(account_id)   

@router.put("/{account_id}")
def update_account(account_id: int, data: AccountSchema):
    return edit_account(account_id, data) 