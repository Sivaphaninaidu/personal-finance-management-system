from fastapi import APIRouter

from schemas.goal_schema import GoalSchema

from services.goal_service import (
    create_goal,
    get_goals,
    remove_goal,
    edit_goal
)

router = APIRouter()


@router.post("/")
def add_goal(data: GoalSchema):
    return create_goal(data)


@router.get("/")
def goals(user_id: int):
    return get_goals(user_id)


@router.delete("/{goal_id}")
def delete_goal(goal_id: int):
    return remove_goal(goal_id)


@router.put("/{goal_id}")
def update_goal(goal_id: int, data: GoalSchema):
    return edit_goal(goal_id, data)