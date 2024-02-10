from fastapi import APIRouter,Depends,Form,status,Path
from tags import Tags
from schemes import tasks_scheme
from auth.token_management import get_active_user_from_header
from schemes import users_scheme
from database.connection import Session,get_database
from crud import tasks_crud
from typing import Annotated,List
from sql import modals
from auth.auth_schemes import credential_authentication
from fastapi.encoders import jsonable_encoder
from dependency.access_control import role_access_controller

router = APIRouter(
    prefix="/tasks",
    tags=[Tags.tasks],
    dependencies=[Depends(credential_authentication)],
    )

# Create
@router.post("/create",response_model=tasks_scheme.TasksUpdate,status_code=status.HTTP_201_CREATED)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.admin])
async def create_tasks(
    title:Annotated[str,Form()],
    desc:Annotated[str|None,Form()]=None,
    status:Annotated[modals.Task.TaskStatus,Form()]=modals.Task.TaskStatus.not_started,
    priority:Annotated[modals.Task.TaskPriority,Form()]=modals.Task.TaskPriority.low,
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session = Depends(get_database)
    ):
    
    new_task = await tasks_crud.create_task(
        title=title,
        desc=desc,
        status=status,
        priority=priority,
        active_user=active_user,
        db=db
    )
    return jsonable_encoder(new_task)

# Retreval
@router.get("/all",response_model=List[tasks_scheme.TasksUpdate],status_code=status.HTTP_200_OK)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.read_only,modals.User.UserRoles.admin])
async def get_all_tasks(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await tasks_crud.get_created_tasks(active_user,db))

@router.get("/{task_id}",response_model=tasks_scheme.TasksUpdate,status_code=status.HTTP_200_OK)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.read_only,modals.User.UserRoles.admin])
async def get_tasks_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await tasks_crud.get_created_tasks_by_task_id(task_id,active_user,db))

# Update
@router.put("/{task_id}",response_model=tasks_scheme.TasksUpdate|None,status_code=status.HTTP_202_ACCEPTED)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.admin])
async def update_task(
    task_id:Annotated[int,Path()],
    field:Annotated[modals.Task.TaskFields,Form()],
    field_value:Annotated[str,Form()],
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session=Depends(get_database)
    ):
    return jsonable_encoder(await tasks_crud.update_task(task_id,field,field_value,db))

#Delete
@router.delete("/{task_id}",status_code=status.HTTP_202_ACCEPTED)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.admin])
async def delete_task_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return await tasks_crud.delete_task_by_task_id(task_id,db)
    
