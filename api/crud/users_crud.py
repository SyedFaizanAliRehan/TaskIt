from fastapi import Depends
from database.connection import Session
from schemes import users_scheme
from sql import modals
from auth.password_management import get_hashed_password
from typing import List

# Create
async def create_user(user:users_scheme.UserCreate,db:Session)->modals.Users:
    new_user = modals.Users(
        user_name = user.user_name,
        first_name = user.first_name,
        last_name = user.last_name,
        email = user.email,
        password = await get_hashed_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
# Retrieve
async def find_user_by_username(user_name:str,db:Session)->modals.Users:
    return db.query(modals.Users).filter(
        modals.Users.user_name == user_name
    ).first()
    
async def find_user_by_email(user_email:str,db:Session)->modals.Users:
    return db.query(modals.Users).filter(
        modals.Users.email == user_email
    ).first()

async def find_user_is_unique(user_name:str,user_email:str,db:Session)->bool:
    return db.query(modals.Users).filter(
        modals.Users.user_name == user_name
        and
        modals.Users.email == user_email
    ).first() is None

async def retrieve_all(db:Session)->List[modals.Users]:
    return db.query(modals.Users).all()
# Update
async def update_field(user_name:str,field:str,field_value:str,db:Session)->modals.Users:
    user = await find_user_by_username(user_name,db)
    if field == modals.Users.UserFields.email:
        user.email = field_value
    elif field == modals.Users.UserFields.first_name:
        user.first_name = field_value
    elif field == modals.Users.UserFields.last_name:
        user.last_name = field_value
    elif field == modals.Users.UserFields.password:
        user.password = await get_hashed_password(field_value)
    db.commit()
    db.refresh(user)
    return user
# Delete
async def delete_user(user:modals.Users,db:Session):
    db.delete(user)
    db.commit()
    return True
