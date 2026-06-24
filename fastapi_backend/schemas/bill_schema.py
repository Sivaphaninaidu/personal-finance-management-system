from pydantic import BaseModel
from datetime import date

class BillSchema(BaseModel):
    user_id: int
    bill_name: str
    description: str
    amount: float
    due_date: date