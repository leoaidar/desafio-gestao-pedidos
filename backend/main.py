from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/pedidos/", response_model=schemas.Pedido)
def criar_pedido(pedido: schemas.PedidoCreate, db: Session = Depends(get_db)):
    db_pedido = models.Pedido(**pedido.model_dump())
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

@app.get("/pedidos/", response_model=List[schemas.Pedido])
def listar_pedidos(db: Session = Depends(get_db)):
    return db.query(models.Pedido).all()

@app.get("/pedidos/{pedido_id}", response_model=schemas.Pedido)
def obter_pedido(pedido_id: str, db: Session = Depends(get_db)):
    pedido = db.query(models.Pedido).filter(models.Pedido.id == pedido_id).first()
    if pedido is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return pedido

@app.put("/pedidos/{pedido_id}", response_model=schemas.Pedido)
def atualizar_pedido(pedido_id: str, pedido: schemas.PedidoCreate, db: Session = Depends(get_db)):
    db_pedido = db.query(models.Pedido).filter(models.Pedido.id == pedido_id).first()
    if db_pedido is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    
    for key, value in pedido.model_dump().items():
        setattr(db_pedido, key, value)
    
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

@app.delete("/pedidos/{pedido_id}")
def remover_pedido(pedido_id: str, db: Session = Depends(get_db)):
    pedido = db.query(models.Pedido).filter(models.Pedido.id == pedido_id).first()
    if pedido is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    
    db.delete(pedido)
    db.commit()
    return {"message": "Pedido removido com sucesso"}

@app.get("/indicador/", response_model=schemas.Indicador)
def calcular_indicador(db: Session = Depends(get_db)):
    resultado = db.query(
        func.count(models.Pedido.id).label('total_pedidos'),
        func.count(models.Pedido.cliente.distinct()).label('total_clientes')
    ).first()
    
    media = resultado.total_pedidos / resultado.total_clientes if resultado.total_clientes > 0 else 0
    return {"media_pedidos_por_cliente": media} 