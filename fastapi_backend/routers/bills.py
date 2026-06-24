from fastapi import APIRouter

from schemas.bill_schema import BillSchema

from services.bill_service import (
    create_bill,
    get_bills,
    remove_bill,
    edit_bill
)

router = APIRouter()


@router.post("/")
def add_bill(data: BillSchema):
    return create_bill(data)


@router.get("/")
def bills(user_id: int):
    return get_bills(user_id)


@router.delete("/{bill_id}")
def delete_bill(bill_id: int):
    return remove_bill(bill_id)


@router.put("/{bill_id}")
def update_bill(bill_id: int, data: BillSchema):
    return edit_bill(bill_id, data)