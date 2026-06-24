from pydantic import BaseModel

class GoalSchema(BaseModel):
    user_id: int
    goal_name: str
    target_amount: float
    saved_amount: float