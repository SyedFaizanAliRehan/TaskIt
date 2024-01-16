from fastapi import APIRouter,Depends,HTTPException,status,Path,Request
from fastapi.exceptions import ResponseValidationError
from schemes import users_scheme
from database.connection import get_database,Session
from crud import users_crud
from tags import Tags
from typing import List
from auth.token_management import verify_token,decode_token
from sql import modals
from typing import Annotated

router = APIRouter(
    prefix="/users",
    tags= [Tags.user],
    dependencies=[Depends(verify_token)],
    responses={
        403 : {"Error":"Authentication Error"},
        500 : {"Error":"Internal server Error"},
    }
    )

@router.post('/create',response_model=users_scheme.User)
async def create_user(user:users_scheme.UserCreate,db:Session=Depends(get_database)):
    error = HTTPException(
        status_code= status.HTTP_403_FORBIDDEN,
        detail= "User already exist!!"
    )
    user_is_unique = await users_crud.find_user_is_unique(
        user_name=user.user_name,
        user_email=user.email,
        db=db
        )
    if not user_is_unique:
        raise error
    try:
        created_user = await users_crud.create_user(user,db)
        return created_user
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f"{e}"
        )

@router.get("/get_user",response_model=users_scheme.User)
async def get_user(user_name:str,db:Session=Depends(get_database)):
    try:
        return await users_crud.find_user_by_username(user_name,db)
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f"{e}"
        )

@router.get("/get_all_users",response_model=List[users_scheme.User])
async def get_all_users(db:Session=Depends(get_database)):
    try:
        return await users_crud.retrieve_all(db)
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f"{e}"
        )

@router.patch("/update",response_model=users_scheme.UserDetails)
async def update(user_name:str,field:modals.Users.UserFields,value:str,db:Session=Depends(get_database)):
    try:
        return await users_crud.update_field(user_name,field,value,db)
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= f"{e}"
        )

@router.delete("/delete/{user_name}")
async def delete_user(user_name:Annotated[str,Path()],request:Request,db:Session=Depends(get_database)):
    token = request.headers.get("Authorization")
    token = token.split("Bearer")[1].strip()
    decoded = await decode_token(token)
    if user_name == decoded.get("user"):
        raise HTTPException(
            status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= "Cannot delete the same user!!"
            )
    else:
        user = await users_crud.find_user_by_username(user_name=user_name,db=db)
        if user is None:
            raise HTTPException(
                status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail= f"Cannot find the user with {user_name}"
                )
        else:
            try:
                return await users_crud.delete_user(user,db)
            except Exception as e:
                raise HTTPException(
                    status_code= status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail= f"{e}"
                    )
