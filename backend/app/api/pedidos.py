from flask import Blueprint, request, jsonify
from ..services.pedido_service import PedidoService
from ..schemas.pedido import PedidoSchema

pedidos_bp = Blueprint('pedidos', __name__)
pedido_service = PedidoService()
pedido_schema = PedidoSchema()
pedidos_schema = PedidoSchema(many=True)

@pedidos_bp.route('/pedidos', methods=['POST'])
def criar_pedido():
    dados = request.get_json()
    pedido = pedido_service.criar_pedido(dados)
    return pedido_schema.dump(pedido), 201

@pedidos_bp.route('/pedidos', methods=['GET'])
def listar_pedidos():
    pedidos = pedido_service.listar_pedidos()
    return pedidos_schema.dump(pedidos)

@pedidos_bp.route('/pedidos/<pedido_id>', methods=['GET'])
def obter_pedido(pedido_id):
    pedido = pedido_service.obter_pedido(pedido_id)
    if pedido is None:
        return {'message': 'Pedido não encontrado'}, 404
    return pedido_schema.dump(pedido)

@pedidos_bp.route('/pedidos/<pedido_id>', methods=['PUT'])
def atualizar_pedido(pedido_id):
    dados = request.get_json()
    pedido = pedido_service.atualizar_pedido(pedido_id, dados)
    if pedido is None:
        return {'message': 'Pedido não encontrado'}, 404
    return pedido_schema.dump(pedido)

@pedidos_bp.route('/pedidos/<pedido_id>', methods=['DELETE'])
def remover_pedido(pedido_id):
    if pedido_service.remover_pedido(pedido_id):
        return {'message': 'Pedido removido com sucesso'}
    return {'message': 'Pedido não encontrado'}, 404

@pedidos_bp.route('/indicador', methods=['GET'])
def calcular_indicador():
    return jsonify(pedido_service.calcular_indicadores()) 