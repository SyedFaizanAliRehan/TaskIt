from fastapi import APIRouter,Depends,HTTPException,status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from database.connection import get_database,Session
from auth.password_management import verify_password
from auth.token_management import create_token
from crud import users_crud
from tags import Tags

router = APIRouter(tags=[Tags.login])

@router.post('/login')
async def login(form:Annotated[OAuth2PasswordRequestForm,Depends()],db:Session=Depends(get_database)):
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = await users_crud.find_user_by_username(form.username,db)
    if user is None:
        raise error
    if await verify_password(form.password,user.password) == False:
        raise error
    payload = {
        "user" : user.user_name
    }
    token = await create_token(data=payload)
    response = JSONResponse({
        "access_token" : token,
        "token_type" : "bearer"
    })
    response.set_cookie(key="LOGIN_INFO",value=token)
    return response
    