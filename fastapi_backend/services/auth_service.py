import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from users.models import User

from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "finance-secret-key"

ALGORITHM = "HS256"


def register_user(data):

    if User.objects.filter(email=data.email).exists():
        return {
            "message": "Email already exists"
        }

    User.objects.create(
        username=data.username,
        email=data.email,
        password=data.password
    )

    return {
        "message": "Registration Successful"
    }   


def login_user(data):

    user = User.objects.filter(
        email=data.email,
        password=data.password
    ).first()

    if not user:
        return {
            "message": "Invalid Credentials"
        }

    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.utcnow() + timedelta(days=1)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
    "token": token,
    "username": user.username,
    "user_id": user.id,
    "email": user.email
}

def change_password(data):

    user = User.objects.filter(
        id=data.user_id,
        password=data.old_password
    ).first()

    if not user:
        return {
            "message":
            "Old Password Incorrect"
        }

    user.password = data.new_password

    user.save()

    return {
        "message":
        "Password Changed Successfully"
    }