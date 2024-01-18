from fastapi import APIRouter,Depends
from tags import Tags
from schemes import tasks_scheme
from auth.token_management import get_active_user
from sql import modals

router = APIRouter(prefix="/tasks",tags=[Tags.tasks])

@router.post("/create",response_model=dict)
async def create_tasks(task:tasks_scheme.TasksCreation,user:modals.User=Depends(get_active_user)):
    return {}
