from database.connection import Session
from api.schemes import tasks_scheme,users_scheme

async def create_task(
    title:str,
    desc:str,
    status:str,
    priority:str,
    active_user:users_scheme.UserDetails,
    db:Session)->tasks_scheme.TasksUpdate:
    new_task = tasks_scheme.TasksUpdate(
        title=title,
        description=desc,
        status=status,
        priority=priority,
        created_by=active_user.id,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
    