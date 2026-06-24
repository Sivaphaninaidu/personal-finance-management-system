import os
import sys
import django

sys.path.append("../django_backend")

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "django_backend.settings"
)

django.setup()

from goals.models import Goal
from users.models import User


def create_goal(data):

    user = User.objects.get(id=data.user_id)

    goal = Goal.objects.create(
        user=user,
        goal_name=data.goal_name,
        target_amount=data.target_amount,
        saved_amount=data.saved_amount
    )

    return {
        "message": "Goal Added Successfully"
    }


def get_goals(user_id):

    goals = Goal.objects.filter(
        user_id=user_id
    )

    return [
        {
            "id": goal.id,
            "goal_name": goal.goal_name,
            "target_amount": float(goal.target_amount),
            "saved_amount": float(goal.saved_amount)
        }
        for goal in goals
    ]

def remove_goal(goal_id):

    goal = Goal.objects.filter(id=goal_id).first()

    if not goal:
        return {"message": "Goal Not Found"}

    goal.delete()

    return {"message": "Goal Deleted Successfully"}


def edit_goal(goal_id, data):

    goal = Goal.objects.filter(id=goal_id).first()

    if not goal:
        return {"message": "Goal Not Found"}

    goal.goal_name = data.goal_name
    goal.target_amount = data.target_amount
    goal.saved_amount = data.saved_amount

    goal.save()

    return {"message": "Goal Updated Successfully"}