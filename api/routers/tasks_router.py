from fastapi import APIRouter,Depends
from tags import Tags
from schemes import tasks_scheme
from auth.token_management import get_active_user
from schemes import users_scheme

router = APIRouter(prefix="/tasks",tags=[Tags.tasks])

@router.post("/create",response_model=dict)
async def create_tasks(task:tasks_scheme.TasksCreation,user:users_scheme.UserDetails=Depends(get_active_user)):
    return {}
