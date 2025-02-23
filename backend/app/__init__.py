from flask import Flask
from .extensions import db, ma
from .config import config
from .api import pedidos_bp

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    ma.init_app(app)

    app.register_blueprint(pedidos_bp)

    with app.app_context():
        db.create_all()

    return app 