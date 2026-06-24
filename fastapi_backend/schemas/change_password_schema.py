from pydantic import BaseModel

class ChangePasswordSchema(BaseModel):
    user_id: int
    old_password: str
    new_password: str