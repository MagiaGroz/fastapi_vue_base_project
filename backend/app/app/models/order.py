from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Date, Numeric
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    coffee_type = Column(String, index=True)
    status = Column(String, index=True)
    weight = Column(Numeric, index=True)
    amount = Column(Integer, index=True)
    send_date = Column(Date)
    deliver_date = Column(Date)
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="orders")
