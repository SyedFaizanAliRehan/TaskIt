from pydantic import Field,BaseModel
from datetime import datetime
from sql import modals

class TasksCreation(BaseModel):
    id:int = Field(title="Task ID",description="Unique ID for tasks",ge=0,exclude=True)
    title:str = Field(title="Title",description="Title of the task")
    description:str = Field(title="Title Desc",description="Description of the task")
    status:str = Field(title="status",description="Status of the task",default=modals.Task.TaskStatus.not_started)
    priority:str = Field(title="priority",description="Priority of the task",default=modals.Task.TaskPriority.low)

    
class TasksUpdate(TasksCreation):
    due_date : datetime|None= Field(title="Due Date",description="Due date for task completion",default=None)
    assigned_to:int|None = Field(title="Asignee",description="Task assigned to User",default=None)
    
    created_by: int = Field(title="Creator",description="User ID of the creator")
    created_date:datetime = Field(title="Created Date",description="Date of task creation" ,default=datetime.utcnow())
    
    # last_modified_by:int = Field(title="Last Modified by",description="User who last modified this task")
    # last_modified_date:datetime = Field(title="Last modified Date",description="Date of task modification" ,default=datetime.utcnow())
    
    # estimated_time: int|None = Field(title="Estimated Time",description="Estimated days required for task completion",default=0)
    # tags:str|None = Field(title="Tags",description="Tags of the tasks",default=None)
    # completed_date:datetime|None = Field(title="Completed Date",description="Date of task completion" ,default=None)
    
    # comments =
