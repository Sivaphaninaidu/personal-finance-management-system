from fastapi import APIRouter

from schemas.change_password_schema import ChangePasswordSchema

from schemas.auth_schema import (
    RegisterSchema,
    LoginSchema
)

from services.auth_service import (
    register_user,
    login_user
)

from services.auth_service import (
    register_user,
    login_user,
    change_password
)

router = APIRouter()


@router.post("/register")
def register(data: RegisterSchema):
    return register_user(data)


@router.post("/login")
def login(data: LoginSchema):
    return login_user(data)

@router.post("/change-password")
def password_change(
    data: ChangePasswordSchema
):
    return change_password(data)