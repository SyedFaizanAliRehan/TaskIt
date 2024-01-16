from fastapi import APIRouter
from tags import Tags
from schemes import tasks_scheme

router = APIRouter(prefix="/tasks",tags=[Tags.tasks])

@router.post("/create",response_model=tasks_scheme.TasksUpdate)
async def create_tasks(task:tasks_scheme.TasksCreation):
    return {}
