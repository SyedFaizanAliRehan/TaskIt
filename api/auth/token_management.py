from jose import jwt,JWTError
from fastapi import Depends,HTTPException,status
from time import time
from decouple import config
from fastapi.security import OAuth2PasswordBearer
from database.connection import get_database,Session
from typing import Annotated
from crud import users_crud

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

oauth2_shceme = OAuth2PasswordBearer(tokenUrl="login")
# Token Verification
async def verify_token(
    token:Annotated[str,Depends(oauth2_shceme)],
    db:Session = Depends(get_database)) -> bool:
    decoded = await decode_token(token=token)
    user = await users_crud.find_user_by_username(decoded.get("user"),db=db)
    if user is None:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if time() > decoded.get("expiry"):
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has expired",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return True
