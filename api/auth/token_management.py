from jose import jwt,JWTError
from fastapi import Depends,HTTPException,status
from time import time
from decouple import config
from database.connection import get_database,Session
from crud import users_crud
from schemes import users_scheme,token_scheme
from fastapi.requests import Request

# Token creation

# Creates a new access token
async def create_access_token(payload:token_scheme.Payload,expiration_time_mins:int|None = None)->str:
    expiry =time() + int(config("API_TIMEOUT")) * 60 # 15 mins
    data = token_scheme.TokenData(payload=payload,expiry=expiry,type=token_scheme.TokenTypes.access_token.value)
    if(expiration_time_mins):
        expiry = time() + expiration_time_mins * 60 # expiration_time_mins mins
    data.expiry = expiry
    return jwt.encode(data.model_dump(),key=config("SECRET_KEY"),algorithm=config("ALGORITHM"))

# Creates a new refresh token
async def create_refresh_token(payload:token_scheme.Payload)->str:
    expiry = time() + 24 * 60 * 60  # 1 day
    data = token_scheme.TokenData(payload=payload,expiry=expiry,type=token_scheme.TokenTypes.refresh_token.value)
    return jwt.encode(data.model_dump(),key=config("SECRET_KEY"),algorithm=config("ALGORITHM"))

# Creates a new token
async def create_token(payload:token_scheme.Payload,access_token_expiry:int|None = None) -> token_scheme.Token:
    access_token = await create_access_token(payload=payload,expiration_time_mins=access_token_expiry)
    refresh_token = await create_refresh_token(payload=payload)
    return token_scheme.Token(access_token=access_token,refresh_token=refresh_token,token_type="bearer")

# Decodes a token
async def decode_token(token:str)->token_scheme.TokenData:
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        decoded = jwt.decode(token=token,key=config("SECRET_KEY"),algorithms=config("ALGORITHM"))
        return token_scheme.TokenData(**decoded)
    except JWTError:
        raise error

# Verifies a token
async def verify_token(token:str,db:Session)->bool:
    decoded = await decode_token(token=token)
    user_name = decoded.payload.user
    user = await users_crud.find_user_by_username(user_name=user_name,db=db)
    if user is None:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorised User",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print("Remaining Time: ",(decoded.expiry - time())/60)
    if time() > decoded.expiry:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"{decoded.type} has expired!!",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return True

# Returns active user from token
async def get_active_user_from_token(token:str,db:Session) -> users_scheme.UserDetails:
    if await verify_token(token=token,db=db) == True:
        decoded = await decode_token(token=token)
        user = await users_crud.find_user_by_username(decoded.payload.user,db=db)
        return users_scheme.UserDetails(
            id = user.id,
            user_name = user.user_name,
            email = user.email,
            first_name = user.first_name,
            last_name = user.last_name,
            role= user.role.value
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Returns token from header
async def get_token_from_header(request:Request)->str:
    if "Authorization" not in request.headers:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return request.headers.get("Authorization").split(" ")[1]

# Returns active user from header
async def get_active_user_from_header(token:str=Depends(get_token_from_header),db:Session=Depends(get_database))->users_scheme.UserDetails:
    return await get_active_user_from_token(token=token,db=db)

    

