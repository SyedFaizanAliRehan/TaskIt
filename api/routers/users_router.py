from fastapi import APIRouter,Depends,HTTPException,status,Path,Form
from fastapi.responses import JSONResponse
from schemes import users_scheme
from database.connection import get_database,Session
from crud import users_crud
from tags import Tags
from typing import List
from typing import Annotated,Any
from sql import modals
from auth.auth_schemes import credential_authentication
from auth.token_management import get_active_user_from_header

router = APIRouter(
    prefix="/users",
    tags= [Tags.user],
    dependencies=[Depends(credential_authentication)],
    responses={
        403 : {"Error":"Authentication Error"},
        500 : {"Error":"Internal server Error"},
    },
    )

@router.post('/create',response_model=users_scheme.User)
async def create_user(user:users_scheme.UserCreate,db:Session=Depends(get_database)):
   return await users_crud.create_user(user,db)

@router.get("/get/all",response_model=List[users_scheme.User])
async def get_all_users(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return await users_crud.find_all_users(db)

@router.get("/get/email/{user_email}",response_model=users_scheme.UserDetails)
async def get_user_by_email(user_email:Annotated[str,Path()],active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    user = await users_crud.find_user_by_email(user_email,db)
    return user

@router.get("/get/{user_name}",response_model=users_scheme.UserDetails)
async def get_user(user_name:Annotated[str,Path()],active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return await users_crud.find_user_by_username(user_name,db)


@router.patch("/update",response_model=users_scheme.UserDetails)
async def update_user(
    user_name:Annotated[str,Form()],
    field:Annotated[modals.User.UserFields,Form()],
    field_value:Annotated[str,Form()],
    active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),
    db:Session=Depends(get_database)
    ):
    if user_name == active_user.user_name and field == modals.User.UserFields.user_name:
        raise HTTPException(
            status_code= status.HTTP_403_FORBIDDEN,
            detail= "Cannot update USER_NAME of the same user!!"
            )
    user = await users_crud.update_user(user_name,field,field_value,db)
    return user

@router.delete("/delete/{user_name}")
async def delete_user(user_name:Annotated[str,Path()],user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    if user_name == user.user_name:
        raise HTTPException(
            status_code= status.HTTP_403_FORBIDDEN,
            detail= "Cannot delete the same user!!"
            )
    else:
        return await users_crud.delete_user(user_name=user_name,db=db)
