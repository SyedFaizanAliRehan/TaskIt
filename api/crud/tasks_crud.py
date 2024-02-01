from database.connection import Session
from schemes import tasks_scheme,users_scheme
from sql import modals
from typing import List
from fastapi import HTTPException
from fastapi import status as status_code

# Creation
async def create_task(title:str,desc:str,status:modals.Task.TaskStatus,priority:modals.Task.TaskPriority,active_user:users_scheme.UserDetails,db:Session)->modals.Task:
    try:
        new_task = modals.Task(
            title=title,
            description=desc,
            status=modals.Task.TaskStatus(status),
            priority=modals.Task.TaskPriority(priority),
            created_by=active_user.id,        
            )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

# Retreval
async def get_all_tasks(db:Session)->List[modals.Task]:
    try:
        return db.query(modals.Task).all()
    except Exception as e:
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

async def get_tasks_by_task_id(task_id:int,db:Session)->modals.Task:
    try:
        task = db.query(modals.Task).filter(
            modals.Task.id == task_id).first()
        return task
    except Exception as e:
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e} occured while fetching task with id {task_id}"
        )
        
async def get_created_tasks(user:users_scheme.UserDetails,db:Session)->List[modals.Task]:
    try:
        return db.query(modals.Task).filter(
            modals.Task.created_by == user.id).all()
    except Exception as e:
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )
        
async def get_created_tasks_by_task_id(task_id:int,user:users_scheme.UserDetails,db:Session)->modals.Task:
    try:
        return db.query(modals.Task).filter(
            modals.Task.created_by == user.id
            and
            modals.Task.id == task_id).first()
    except Exception as e:
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

# Update
async def update_task(task_id:int,field:modals.Task.TaskFields,field_value:str,db:Session)->modals.Task:
    try:
        task = await get_tasks_by_task_id(task_id,db)
        setattr(task,field.name,field_value)
        db.commit()
        db.refresh(task)
        return task
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e} occured while updating task with id {task_id}"
        )

# Delete
async def delete_task_by_task_id(task_id:int,db:Session)->bool:
    try:
        task = await get_tasks_by_task_id(task_id,db)
        db.delete(task)
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status_code.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

