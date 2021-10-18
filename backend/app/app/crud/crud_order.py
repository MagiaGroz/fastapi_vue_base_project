from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: OrderCreate, owner_id: int
    ) -> Order:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Order]:
        return (
            db.query(self.model)
            .filter(Order.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


order = CRUDOrder(Order)
