from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PedidoBase(BaseModel):
    cliente: str
    valor: float
    descricao: Optional[str] = None

class PedidoCreate(PedidoBase):
    pass

class Pedido(PedidoBase):
    id: str
    data_criacao: datetime

    class Config:
        from_attributes = True

class Indicador(BaseModel):
    media_pedidos_por_cliente: float 