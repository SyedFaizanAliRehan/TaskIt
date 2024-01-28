from fastapi import APIRouter,Depends,HTTPException,status,Header
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from database.connection import get_database,Session
from auth.password_management import verify_password
from auth.token_management import create_token,verify_token,decode_token
from crud import users_crud
from tags import Tags
from schemes import token_scheme
from typing import Annotated
from time import time

router = APIRouter(tags=[Tags.login])

# Login
@router.post('/login',response_model=token_scheme.Token)
async def login(form:Annotated[OAuth2PasswordRequestForm,Depends()],db:Session=Depends(get_database)):
    user = await users_crud.find_user_by_username(form.username,db)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid Username!!"
        )
    if await verify_password(form.password,user.password) == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Password!!"
        )
    payload = token_scheme.Payload(user=user.user_name)
    token = await create_token(payload=payload)
    response = JSONResponse(content=token.model_dump(),status_code=status.HTTP_200_OK)
    return response

# Creates a new token using refresh token
@router.post('/refresh-token',response_model=token_scheme.Token)
async def reset_token(refresh_token:Annotated[str,Header(...,alias="refresh-token")],db:Session=Depends(get_database)):
    decoded = await decode_token(refresh_token)
    if decoded.type != token_scheme.TokenTypes.refresh_token.value or await verify_token(refresh_token,db) == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Refresh Token!!"
        )
    payload = token_scheme.Payload(user=decoded.payload.user)
    token = await create_token(payload=payload)
    response = JSONResponse(content=token.model_dump(),status_code=status.HTTP_200_OK)
    return response

@router.post('/logout',dependencies=[])
async def logout():
    response = JSONResponse({"message": "Logout successful"})
    try:
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e}"
        )
