from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func
import uuid
from database import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    cliente = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    data_criacao = Column(DateTime, default=func.now())
    descricao = Column(String) 