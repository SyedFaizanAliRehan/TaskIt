from pydantic import BaseModel, Field
from enum import Enum

class TokenTypes(Enum):
    access_token = "Access Token"
    refresh_token = "Refresh Token"
    
class Payload(BaseModel):
    user:str = Field(...,example="user1")
    
    class Config:
        form_attributes = True

class TokenData(BaseModel):
    payload:Payload = Field(...,example={"user":"user1"})
    expiry:float = Field(...,example=1621457636)
    type:str = Field(...,example="Access Token")
    
class Token(BaseModel):
    access_token: str = Field(...,example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6LTEsImlhdCI6MTYyMTQ1NzYzNn0.8b8mZ4Xw2Dn0Z7kxM2z8GKp2q6w8YqNkU0vZkL6Zu6A")
    refresh_token:str = Field(...,example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6LTEsImlhdCI6MTYyMTQ1NzYzNn0.8b8mZ4Xw2Dn0Z7kxM2z8GKp2q6w8YqNkU0vZkL6Zu6A")
    token_type: str = Field(default="bearer",example="bearer")
