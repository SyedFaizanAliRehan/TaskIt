from pydantic import BaseModel
from fastapi import Query

class CommonParameters(BaseModel):
    q:str = Query(None,min_length=3,max_length=50,description="Search query")
    limit:int = Query(10,gt=0,le=100,description="Limit the number of results")
    skip:int = Query(0,ge=0,description="Skip the number of results")
    