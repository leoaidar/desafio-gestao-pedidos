from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from .extensions import db, ma
from .config import config

# Criação da instância da API
rest_api = Api(
    title='API de Gestão de Pedidos',
    version='1.0',
    description='API para gerenciamento de pedidos',
    doc='/swagger',  
    prefix='/api'    
)

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Configurações adicionais
    app.config['RESTX_MASK_SWAGGER'] = False
    app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list'
    app.config['RESTX_ERROR_404_HELP'] = False

    # CORS
    CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    rest_api.init_app(app)
    db.init_app(app)
    ma.init_app(app)

    # namespaces erro importação circular
    from .api.pedidos import api as pedidos_ns
    rest_api.add_namespace(pedidos_ns, path='/pedidos')

    with app.app_context():
        db.create_all()

    return app 