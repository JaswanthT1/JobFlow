from pydantic import BaseModel, Field
from datetime import date
from enum import Enum 


class ApplicationStatus(str, Enum):
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    REJECTED = "Rejected"
    OFFER = "Offer"


class ApplicationCreate(BaseModel):
    company: str = Field(min_length=1, max_length=100)
    position: str = Field(min_length=1, max_length=100)
    salary: float | None = Field(default=None, ge=0)
    status: ApplicationStatus = ApplicationStatus.APPLIED
    application_date: date


class ApplicationUpdate(BaseModel):
    company: str | None = Field(default=None, min_length=1, max_length=100)
    position: str | None = Field(default=None, min_length=1, max_length=100)
    salary: float | None = Field(default=None, ge=0)
    status: ApplicationStatus | None = None
    application_date: date | None = Field(default=None)

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    email: str = Field(min_length=5, max_length=150)
    password: str = Field(min_length=8, max_length=100)

class UserLogin(BaseModel):
    username: str
    password: str