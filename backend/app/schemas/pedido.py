from ..extensions import ma
from ..models.pedido import Pedido

class PedidoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Pedido
        load_instance = True

    id = ma.auto_field()
    cliente = ma.auto_field()
    valor = ma.auto_field()
    data_criacao = ma.auto_field()
    descricao = ma.auto_field() 