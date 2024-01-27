from pydantic import Field,EmailStr,BaseModel
from typing import List
from . import tasks_scheme

class User(BaseModel):
    id:int = Field(title="User ID",description="This is the user's ID",ge=0,exclude=True)
    user_name:str = Field(title="User Name",description="This is the user's name",max_length=25,min_length=5)
    email:EmailStr = Field(title="Email",description="This is the Email of the user",max_length=25)

class UserDetails(User):
    first_name:str = Field(title="First Name",description="This is the first name of the user",max_length=25)
    last_name:str = Field(title="Last Name",description="This is the last name of the user",max_length=25)
    created_tasks:List[tasks_scheme.TasksUpdate]=[]
    
    class Config:
        form_attributes = True

class UserCreate(UserDetails):
    password:str = Field(title="Password",description="This is the password of the user",max_length=15,min_length=5)
    model_config = {
        "json_schema_extra":{
            "examples":[
                {
                    "id":0,
                    "user_name":"johndoe",
                    "first_name":"John",
                    "last_name":"Doe",
                    "email":"johndoe@taskit.com",
                    "password":"Password@123"
                },
            ]
        }
    }
