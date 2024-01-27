from jose import jwt,JWTError
from fastapi import Depends,HTTPException,status
from time import time
from decouple import config
from database.connection import get_database,Session
from crud import users_crud
from schemes import users_scheme
from fastapi.requests import Request

# Token creation
async def create_token(data:dict,expiration_time_mins:int|None = None)->str:
    payload = data.copy()
    expiry =time() + int(config("API_TIMEOUT")) * 60
    if(expiration_time_mins):
        expiry = time() + expiration_time_mins * 60
    payload.update({"expiry":expiry})
    return jwt.encode(payload,key=config("SECRET_KEY"),algorithm=config("ALGORITHM"))

# Token decode
async def decode_token(token:str)->dict:
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        decoded = jwt.decode(token=token,key=config("SECRET_KEY"),algorithms=config("ALGORITHM"))
        if decoded.get("user") is None:
            raise error
        return decoded
    except JWTError:
        raise error

# Updating Token
async def update_token(token:str)->str:
    decoded = await decode_token(token=token)
    if decoded.get("expiry") - time() < 300:
        return await create_token(data=decoded)
    return token

# Token Verification
async def verify_token(token:str,db:Session)->bool:
    decoded = await decode_token(token=token)
    user = await users_crud.find_user_by_username(decoded.get("user"),db=db)
    if user is None:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorised User",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if time() > decoded.get("expiry"):
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has expired!!",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return True

async def get_active_user_from_token(token:str,db:Session) -> users_scheme.UserDetails:
    if await verify_token(token=token,db=db) == True:
        decoded = await decode_token(token=token)
        user = await users_crud.find_user_by_username(decoded.get("user"),db=db)
        return users_scheme.UserDetails(
            id = user.id,
            user_name = user.user_name,
            email = user.email,
            first_name = user.first_name,
            last_name = user.last_name
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_token_from_header(request:Request)->str:
    return request.headers.get("Authorization").split(" ")[1]

async def get_active_user_from_header(token:str=Depends(get_token_from_header),db:Session=Depends(get_database))->users_scheme.UserDetails:
    return await get_active_user_from_token(token=token,db=db)

    

