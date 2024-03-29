from sqlalchemy import String,ForeignKey,Enum
from sqlalchemy.orm import Mapped,mapped_column,relationship
from database.connection import Base
import enum
from datetime import datetime
from typing import List

class User(Base):
    __tablename__ = "users"
    
    class UserRoles(enum.Enum):
        admin = "Admin"
        read_only = "Read Only"
        read_write = "Read Write"
    
    class UserFields(enum.Enum):
        first_name = "First Name"
        last_name = "Last Name"
        email = "Email"
        password = "Password"
        user_name = "User Name"
        
    id:Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True)
    user_name:Mapped[str] = mapped_column(String(10),unique=True,index=True)
    email:Mapped[str] = mapped_column(String(25),unique=True,index=True)
    role:Mapped[Enum] = mapped_column(Enum(UserRoles),default=UserRoles.read_only)
    
    
    first_name:Mapped[str] = mapped_column(String(10))
    last_name:Mapped[str] = mapped_column(String(10))
    created_tasks:Mapped[List["Task"]] = relationship(back_populates="created_by_user")
    
    password:Mapped[str] = mapped_column(String(15))
    

class Task(Base):
    __tablename__ = 'tasks'
    
    class TaskStatus(enum.Enum):
        not_started = "Not Started"
        in_progress = "In Progress"
        closed = "Closed"
    
    class TaskPriority(enum.Enum):
        low = "Low"
        medium = "Medium"
        high = "High"
    
    class TaskFields(enum.Enum):
        title = "Title"
        description = "Description"
        status = "Status"
        priority = "Priority"
        due_date = "Due Date"
        assigned_to = "Assigned To"

    id:Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True)
    title:Mapped[str] = mapped_column(String(30))
    description:Mapped[str|None] = mapped_column(String(60))
    status:Mapped[Enum] = mapped_column(Enum(TaskStatus),default=TaskStatus.not_started)
    priority:Mapped[Enum] = mapped_column(Enum(TaskPriority),default=TaskPriority.low)
    
    due_date:Mapped[datetime|None] = mapped_column(String(30),default=None)
    assigned_to:Mapped[int|None] = mapped_column(default=None)
    
    created_by:Mapped[int] = mapped_column(ForeignKey("users.id"))
    created_date:Mapped[datetime] = mapped_column(default=datetime.utcnow())
    
    created_by_user:Mapped["User"] = relationship(back_populates="created_tasks")
    
    
    # last_modified_by = Column(String)
    # last_modified_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # tags = Column(String)
    # completed_date = Column(DateTime)


        
