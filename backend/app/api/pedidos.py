from flask_restx import Namespace, Resource, fields
from ..services.pedido_service import PedidoService
from ..schemas.pedido import PedidoSchema

api = Namespace('pedidos', description='Operações de pedidos')

pedido_service = PedidoService()
pedido_schema = PedidoSchema()
pedidos_schema = PedidoSchema(many=True)

#Swagger
pedido_model = api.model('Pedido', {
    'cliente': fields.String(required=True, description='Nome do cliente'),
    'valor': fields.Float(required=True, description='Valor do pedido'),
    'descricao': fields.String(description='Descrição do pedido')
})

pedido_response = api.inherit('PedidoResponse', pedido_model, {
    'id': fields.String(description='ID do pedido'),
    'data_criacao': fields.DateTime(description='Data de criação do pedido')
})

@api.route('/')
class PedidoList(Resource):
    @api.doc('listar_pedidos')
    @api.marshal_list_with(pedido_response)
    def get(self):
        """Lista todos os pedidos"""
        pedidos = pedido_service.listar_pedidos()
        return pedidos_schema.dump(pedidos)

    @api.doc('criar_pedido')
    @api.expect(pedido_model)
    @api.marshal_with(pedido_response, code=201)
    def post(self):
        """Cria um novo pedido"""
        dados = api.payload
        pedido = pedido_service.criar_pedido(dados)
        return pedido_schema.dump(pedido), 201

@api.route('/<string:pedido_id>')
@api.param('pedido_id', 'ID do pedido')
class Pedido(Resource):
    @api.doc('obter_pedido')
    @api.marshal_with(pedido_response)
    def get(self, pedido_id):
        """Obtém um pedido específico"""
        pedido = pedido_service.obter_pedido(pedido_id)
        if pedido is None:
            api.abort(404, "Pedido não encontrado")
        return pedido_schema.dump(pedido)

    @api.doc('atualizar_pedido')
    @api.expect(pedido_model)
    @api.marshal_with(pedido_response)
    def put(self, pedido_id):
        """Atualiza um pedido"""
        dados = api.payload
        pedido = pedido_service.atualizar_pedido(pedido_id, dados)
        if pedido is None:
            api.abort(404, "Pedido não encontrado")
        return pedido_schema.dump(pedido)

    @api.doc('remover_pedido')
    def delete(self, pedido_id):
        """Remove um pedido"""
        if pedido_service.remover_pedido(pedido_id):
            return {'message': 'Pedido removido com sucesso'}
        api.abort(404, "Pedido não encontrado")

@api.route('/indicador')
class Indicador(Resource):
    @api.doc('calcular_indicador')
    def get(self):
        """Calcula a média de pedidos por cliente"""
        return pedido_service.calcular_indicadores() 