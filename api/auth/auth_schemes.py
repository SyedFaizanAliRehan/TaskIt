from fastapi import HTTPException, status,Depends
from fastapi.requests import Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials,OAuth2PasswordBearer
from database.connection import get_database,Session
from typing import Annotated
from auth.token_management import verify_token

class TokenAuthentication(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(TokenAuthentication, self).__init__(auto_error=auto_error)

    async def __call__(self, request:Request):
        credentials: HTTPAuthorizationCredentials = await super(TokenAuthentication, self).__call__(request)
        if credentials and credentials.scheme == "Bearer":
            return credentials.credentials
        else:
            return HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

token_authentication_shceme = TokenAuthentication()
async def token_authentication(token:Annotated[str,Depends(token_authentication_shceme)],db:Session = Depends(get_database)) -> bool:
    return await verify_token(token,db)

oauth2_shceme = OAuth2PasswordBearer(tokenUrl="login")
async def credential_authentication(token:Annotated[str,Depends(oauth2_shceme)],db:Session = Depends(get_database)) -> bool:
    return await verify_token(token,db)

