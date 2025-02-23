from flask import Flask
from flask_cors import CORS
from .extensions import db, ma
from .config import config
from .api import pedidos_bp

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    ma.init_app(app)

    app.register_blueprint(pedidos_bp)

    with app.app_context():
        db.create_all()

    return app 