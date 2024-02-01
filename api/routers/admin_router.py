from fastapi import Depends,HTTPException,status,APIRouter,Path,Form
from fastapi.encoders import jsonable_encoder
from schemes import users_scheme,tasks_scheme
from database.connection import Session,get_database
from auth.token_management import get_active_user_from_header
from crud import users_crud,tasks_crud
from typing import Annotated,List
from sql import modals
from tags import Tags
from auth.auth_schemes import credential_authentication

router = APIRouter(
    prefix="/admin",
    tags= [Tags.admin],
    dependencies=[Depends(credential_authentication)],
    )

# Users
@router.post('/users/create',response_model=users_scheme.User,status_code=status.HTTP_201_CREATED)
async def create_user(user:users_scheme.UserCreate,db:Session=Depends(get_database)):
   return jsonable_encoder(await users_crud.create_user(user,db))

@router.get("/get/all",response_model=List[users_scheme.User],status_code=status.HTTP_200_OK)
async def get_all_users(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await users_crud.find_all_users(db))

@router.get("/get/email/{user_email}",response_model=users_scheme.UserDetails,status_code=status.HTTP_200_OK)
async def get_user_by_email(user_email:Annotated[str,Path()],active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    users = await users_crud.find_user_by_email(user_email,db)
    return jsonable_encoder(users)

@router.get("/get/{user_name}",response_model=users_scheme.UserDetails,status_code=status.HTTP_200_OK)
async def get_user(user_name:Annotated[str,Path()],active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await users_crud.find_user_by_username(user_name,db))

@router.patch("/update",response_model=users_scheme.UserDetails,status_code=status.HTTP_202_ACCEPTED)
async def update_user(
    user_name:Annotated[str,Form()],
    field:Annotated[modals.User.UserFields,Form()],
    field_value:Annotated[str,Form()],
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session=Depends(get_database)
    ):
    if field == modals.User.UserFields.user_name:
        raise HTTPException(
            status_code= status.HTTP_403_FORBIDDEN,
            detail= "Cannot update USER_NAME of the user!!"
            )
    user = await users_crud.update_user(user_name,field,field_value,db)
    return jsonable_encoder(user)

@router.delete("/users/delete/{user_name}",status_code=status.HTTP_202_ACCEPTED)
async def delete_user(user_name:Annotated[str,Path()],user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    if user_name == user.user_name:
        raise HTTPException(
            status_code= status.HTTP_403_FORBIDDEN,
            detail= "Cannot delete the same user!!"
            )
    else:
        return await users_crud.delete_user(user_name=user_name,db=db)
# Tasks
@router.get("/tasks/all",response_model=List[tasks_scheme.TasksUpdate],status_code=status.HTTP_200_OK)
async def get_all_tasks(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await tasks_crud.get_all_tasks(db))

@router.get("/tasks/{task_id}",response_model=tasks_scheme.TasksUpdate,status_code=status.HTTP_200_OK)
async def get_tasks_by_task_id(task_id:int,active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await tasks_crud.get_tasks_by_task_id(task_id,db))

