from pydantic import BaseModel
from datetime import date

class TransactionSchema(BaseModel):
    account_id: int
    transaction_type: str
    amount: float
    date: date