from database.connection import Session
from schemes import tasks_scheme,users_scheme
from sql import modals
from typing import List
# Creation
async def create_task(
    title:str,
    desc:str,
    status:modals.Task.TaskStatus,
    priority:modals.Task.TaskPriority,
    active_user:users_scheme.UserDetails,
    db:Session)->tasks_scheme.TasksUpdate:
    
    new_task = modals.Task(
        title=title,
        description=desc,
        status=status.value,
        priority=priority.value,
        created_by=active_user.id,
        
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# Retreval
async def get_all_tasks(db:Session)->List[tasks_scheme.TasksUpdate]:
    return db.query(modals.Task).all()

async def get_all_my_tasks(active_user:users_scheme.UserDetails,db:Session)->List[tasks_scheme.TasksUpdate]:
    return db.query(modals.Task).filter(
        modals.Task.created_by == active_user.id
    ).all()
        
async def get_all_tasks_created_by_user(user:users_scheme.UserDetails,db:Session)->List[tasks_scheme.TasksUpdate]:
    return db.query(modals.Task).filter(
        modals.Task.created_by == user.id
    ).all()
    
async def get_tasks_by_task_id(task_id:int,db:Session)->tasks_scheme.TasksUpdate:
    return db.query(modals.Task).filter(
        modals.Task.id == task_id
    ).first()

async def get_my_tasks_by_task_id(task_id:int,active_user:users_scheme.UserDetails,db:Session)->tasks_scheme.TasksUpdate:
    return db.query(modals.Task).filter(
        modals.Task.id == task_id
        and
        modals.Task.created_by == active_user.id
    ).first()

# Update
async def update_task(task_id:int,field:modals.Task.TaskFields,field_value:str,db:Session)->tasks_scheme.TasksUpdate:
    task = await get_tasks_by_task_id(task_id,db)
    setattr(task,field.name,field_value)
    db.commit()
    db.refresh(task)
    return task

# Delete
async def delete_task_by_task_id(task_id:int,db:Session)->bool:
    task = await get_tasks_by_task_id(task_id,db)
    db.delete(task)
    db.commit()
    return True

