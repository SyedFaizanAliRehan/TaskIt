from database.connection import Session
from api.schemes import tasks_scheme
from sql import modals

async def create_task(task:tasks_scheme.TasksCreation,db:Session)->tasks_scheme.TasksUpdate:
    new_task = tasks_scheme.TasksUpdate(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        created_by=task.created_by,
        last_modified_by=task.last_modified_by,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
    