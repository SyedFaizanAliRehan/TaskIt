from fastapi import HTTPException,status
from functools import wraps
from sql.modals import User

async def role_access_controller(roles=[User.UserRoles.read_only]):
    async def decorator(func):
        @wraps(func)
        async def wrapper(user:User,*args, **kwargs):
            if user.role in roles:
                print(f"{user.user_name} access granted")
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Unauthorised User",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            result = await func(user,*args, **kwargs)
            return result
        return wrapper
    return decorator
