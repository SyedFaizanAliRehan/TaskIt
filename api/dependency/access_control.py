from fastapi import HTTPException,status
from functools import wraps
from sql.modals import User
from typing import List
from schemes import users_scheme

def role_access_controller(roles:List[User.UserRoles]):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            active_user:users_scheme.UserDetails = kwargs.get("active_user")
            if active_user is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="There is no active user",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            role = User.UserRoles(active_user.role)
            if role in roles:
                print(f"{active_user.user_name} access granted")
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User's role is does not have access to this resource",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            result = await func(*args, **kwargs)
            return result
        return wrapper
    return decorator
