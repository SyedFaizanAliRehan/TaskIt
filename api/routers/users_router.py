from fastapi import APIRouter,Depends,HTTPException,status,Path,Form
from fastapi.responses import JSONResponse
from schemes import users_scheme
from database.connection import get_database,Session
from crud import users_crud
from tags import Tags
from typing import Annotated
from sql import modals
from auth.auth_schemes import credential_authentication
from auth.token_management import get_active_user_from_header
from fastapi.encoders import jsonable_encoder
from dependency.access_control import role_access_controller

router = APIRouter(
    prefix="/users",
    tags= [Tags.user],
    dependencies=[Depends(credential_authentication)],
    )


# Retreval
@router.get("/me",response_model=users_scheme.User,status_code=status.HTTP_200_OK)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.read_only,modals.User.UserRoles.admin])
async def get_me(active_user:users_scheme.UserDetails=Depends(get_active_user_from_header),db:Session=Depends(get_database)):
    return jsonable_encoder(await users_crud.find_user_by_username(active_user.user_name,db))

#Update
@router.patch("/update",response_model=users_scheme.UserDetails,status_code=status.HTTP_202_ACCEPTED)
@role_access_controller(roles = [modals.User.UserRoles.read_write,modals.User.UserRoles.admin])
async def update_user(
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
    user = await users_crud.update_user(active_user.user_name,field,field_value,db)
    return jsonable_encoder(user)

