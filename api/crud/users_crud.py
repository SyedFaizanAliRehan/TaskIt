from fastapi import Depends
from database.connection import Session
from schemes import users_scheme
from sql import modals
from auth.password_management import get_hashed_password
from typing import List
from fastapi import HTTPException,status


async def find_user_is_unique(user_name:str,user_email:str,db:Session)->bool:
    return db.query(modals.User).filter(
        modals.User.user_name == user_name
        or
        modals.User.email == user_email
    ).first() is None

# Create
async def create_user(user:users_scheme.UserCreate,db:Session)->modals.User|None:
    temp_flag = await find_user_is_unique(user.user_name,user.email,db)
    if temp_flag == False:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with user_name {user.user_name} or email {user.email} already exist"
        )
    else:
        new_user = modals.User(
            user_name = user.user_name,
            first_name = user.first_name,
            last_name = user.last_name,
            email = user.email,
            password = await get_hashed_password(user.password)
            )
        try:
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"{e.args}"
            )

# Retrieve
async def find_all_users(db:Session)->List[modals.User]:
    try:
        return db.query(modals.User).all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

async def find_user_by_username(user_name:str,db:Session)->modals.User:
    user = db.query(modals.User).filter(
        modals.User.user_name == user_name
    ).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with user_name {user_name} not found"
        )
    return user
    
async def find_user_by_email(user_email:str,db:Session)->modals.User:
    user = db.query(modals.User).filter(
        modals.User.email == user_email
    ).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email {user_email} not found"
        )
    return user

# Update
async def update_user(user_name:str,field:modals.User.UserFields,field_value:str,db:Session)->modals.User:
    user = await find_user_by_username(user_name,db)
    try:
        if field == modals.User.UserFields.password:
            field_value = await get_hashed_password(field_value)
        setattr(user,field.name,field_value)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )

# Delete
async def delete_user(user_name:str,db:Session)->dict:
    user = await find_user_by_username(user_name,db)
    try:
        db.delete(user)
        db.commit()
        return {"message":f"User with user_name {user.user_name} deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"{e.args}"
        )
