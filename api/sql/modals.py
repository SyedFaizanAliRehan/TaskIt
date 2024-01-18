from sqlalchemy import Column,Integer,String,DateTime
from database.connection import Base
from enum import Enum
from datetime import datetime

class User(Base):
    __tablename__="users"
    
    class UserFields(Enum):
        first_name = "First Name"
        last_name = "Last Name"
        email = "Email"
        password = "Password"
        user_name = "User Name"
        
    id:int = Column(Integer,primary_key=True,autoincrement=True,index=True)
    user_name:str = Column(String,unique=True,index=True)
    first_name:str = Column(String)
    last_name:str = Column(String)
    email:str = Column(String,unique=True)
    password:str = Column(String)
    

class Task(Base):
    __tablename__ = 'tasks'
    
    class TaskStatus(Enum):
        not_started = "Not Started"
        in_progress = "In Progress"
        closed = "Closed"
    
    class TaskPriority(Enum):
        low = "Low"
        medium = "Medium"
        high = "High"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String[50])
    status = Column(String, default=TaskStatus.not_started.value)
    priority = Column(String, default=TaskPriority.low.value)
    due_date = Column(DateTime)
    assigned_to = Column(String)
    
    created_by = Column(String)
    created_date = Column(DateTime, default=datetime.utcnow)
    # last_modified_by = Column(String)
    # last_modified_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # tags = Column(String)
    # completed_date = Column(DateTime)


        
