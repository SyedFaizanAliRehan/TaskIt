from fastapi import APIRouter,Depends,Form,HTTPException,status,Path
from tags import Tags
from schemes import tasks_scheme
from auth.token_management import get_active_user_from_header
from schemes import users_scheme
from database.connection import Session,get_database
from crud import tasks_crud,users_crud
from typing import Annotated,List
from sql import modals
from auth.auth_schemes import credential_authentication

router = APIRouter(prefix="/tasks",tags=[Tags.tasks],dependencies=[Depends(credential_authentication)],)

@router.post("/create",response_model=tasks_scheme.TasksUpdate)
async def create_tasks(
    title:Annotated[str,Form()],
    desc:Annotated[str|None,Form()]=None,
    status:Annotated[modals.Task.TaskStatus,Form()]=modals.Task.TaskStatus.not_started,
    priority:Annotated[modals.Task.TaskPriority,Form()]=modals.Task.TaskPriority.low,
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session = Depends(get_database)
    ):
    
    try:
        new_task = await tasks_crud.create_task(
            title=title,
            desc=desc,
            status=status,
            priority=priority,
            active_user=active_user,
            db=db
        )
        return new_task
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )

@router.get("/all",response_model=List[tasks_scheme.TasksUpdate])
async def get_all_tasks(db:Session=Depends(get_database)):
    try:
        return await tasks_crud.get_all_tasks(db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )

@router.get("/all/{user_name}",response_model=List[tasks_scheme.TasksUpdate|None])
async def get_all_tasks_created_by_user(user_name:str,db:Session=Depends(get_database)):
    user = await users_crud.find_user_by_username(user_name,db)
    try:
        return await tasks_crud.get_all_tasks_created_by_user(user,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )
        
@router.get("/my",response_model=List[tasks_scheme.TasksUpdate])
async def get_all_my_tasks(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    try:
        return await tasks_crud.get_all_my_tasks(active_user,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )

@router.get("/my/{task_id}",response_model=tasks_scheme.TasksUpdate|None)
async def get_my_tasks_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    try:
        return await tasks_crud.get_my_tasks_by_task_id(task_id,active_user,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )


@router.get("/{task_id}",response_model=tasks_scheme.TasksUpdate)
async def get_task_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    try:
        return await tasks_crud.get_tasks_by_task_id(task_id,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )

@router.put("/{task_id}",response_model=tasks_scheme.TasksUpdate|None)
async def update_task(
    task_id:Annotated[int,Path()],
    field:Annotated[modals.Task.TaskFields,Form()],
    field_value:Annotated[str,Form()],
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session=Depends(get_database)
    ):
    try:
        return await tasks_crud.update_task(task_id,field,field_value,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )

@router.delete("/{task_id}")
async def delete_task_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    try:
        return await tasks_crud.delete_task_by_task_id(task_id,db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )
