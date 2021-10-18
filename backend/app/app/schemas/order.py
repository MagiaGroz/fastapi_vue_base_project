from datetime import date
from typing import Optional

from pydantic import BaseModel


# Shared properties
class OrderBase(BaseModel):
    coffee_type: Optional[str] = None


# Properties to receive on item creation
class OrderCreate(OrderBase):
    coffee_type: str
    amount: int
    weight: int
    send_date: date
    deliver_date: date


# Properties to receive on item update
class OrderUpdate(OrderBase):
    pass


# Properties shared by models stored in DB
class OrderInDBBase(OrderBase):
    id: int
    coffee_type: str
    owner_id: int
    amount: int
    weight: float
    send_date: date
    deliver_date: date

    class Config:
        orm_mode = True


# Properties to return to client
class Order(OrderInDBBase):
    pass


# Properties properties stored in DB
class OrderInDB(OrderInDBBase):
    pass
