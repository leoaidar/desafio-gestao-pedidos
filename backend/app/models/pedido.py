from ..extensions import db
import uuid
from datetime import datetime

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cliente = db.Column(db.String(100), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    descricao = db.Column(db.String(200)) 