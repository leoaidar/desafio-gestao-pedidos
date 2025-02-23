from ..repositories.pedido_repository import PedidoRepository
from ..models.pedido import Pedido

class PedidoService:
    def __init__(self):
        self.repository = PedidoRepository()

    def criar_pedido(self, dados):
        pedido = Pedido(**dados)
        return self.repository.create(pedido)

    def listar_pedidos(self):
        return self.repository.get_all()

    def obter_pedido(self, pedido_id):
        return self.repository.get_by_id(pedido_id)

    def atualizar_pedido(self, pedido_id, dados):
        pedido = self.repository.get_by_id(pedido_id)
        if pedido:
            for key, value in dados.items():
                setattr(pedido, key, value)
            return self.repository.update(pedido)
        return None

    def remover_pedido(self, pedido_id):
        pedido = self.repository.get_by_id(pedido_id)
        if pedido:
            self.repository.delete(pedido)
            return True
        return False

    def calcular_indicadores(self):
        result = self.repository.get_indicadores()
        media = result.total_pedidos / result.total_clientes if result.total_clientes > 0 else 0
        return {'media_pedidos_por_cliente': media} 