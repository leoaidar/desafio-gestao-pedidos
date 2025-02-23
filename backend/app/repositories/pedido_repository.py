from ..extensions import db
from ..models.pedido import Pedido
from sqlalchemy import func

class PedidoRepository:
    def create(self, pedido):
        db.session.add(pedido)
        db.session.commit()
        return pedido

    def get_all(self):
        return Pedido.query.all()

    def get_by_id(self, pedido_id):
        return Pedido.query.get(pedido_id)

    def update(self, pedido):
        db.session.commit()
        return pedido

    def delete(self, pedido):
        db.session.delete(pedido)
        db.session.commit()

    def get_indicadores(self):
        result = db.session.query(
            func.count(Pedido.id).label('total_pedidos'),
            func.count(func.distinct(Pedido.cliente)).label('total_clientes')
        ).first()
        return result 