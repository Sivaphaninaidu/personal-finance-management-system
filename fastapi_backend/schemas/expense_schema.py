from pydantic import BaseModel
from datetime import date

class ExpenseSchema(BaseModel):
    user_id: int
    category: str
    amount: float
    date: date