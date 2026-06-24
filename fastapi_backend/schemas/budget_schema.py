from pydantic import BaseModel


class BudgetSchema(BaseModel):
    user_id: int
    category: str
    budget_amount: float