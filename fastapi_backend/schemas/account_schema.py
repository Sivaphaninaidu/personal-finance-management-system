from pydantic import BaseModel

class AccountSchema(BaseModel):
    user_id: int
    account_name: str
    account_number: str
    card_type: str
    balance: float