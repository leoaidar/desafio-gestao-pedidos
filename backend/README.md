# Backend do Sistema de Gestão de Pedidos

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o Python instalado em sua máquina. Versão utilizada Python 3.13.1. Você pode baixar o Python [aqui](https://www.python.org/).


## Configuração

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Inicie o Servidor:
```bash
python run.py
```

3. Back-End rodando:
```bash
http://localhost:5000/
```

*Se precisar atualize o pip:
```bash
python -m pip install --upgrade pip
```


## Documentação

1. Acessando o Swagger:
```bash
http://localhost:5000/swagger
```

## API Endpoints

- `POST api/pedidos` - Criar novo pedido
- `GET api/pedidos` - Listar todos os pedidos
- `GET api/pedidos/{id}` - Obter detalhes de um pedido
- `PUT api/pedidos/{id}` - Atualizar um pedido
- `DELETE api/pedidos/{id}` - Remover um pedido
- `GET api/pedidos/indicador` - Obter média de pedidos por cliente


## Banco de Dados SQLite

## Modelo de Dados

### Tabela: Pedidos

| Campo         | Tipo         | Restrições    | Descrição                    |
|--------------|--------------|---------------|------------------------------|
| id           | String(36)   | PK, NOT NULL  | UUID - Identificador único   |
| cliente      | String(100)  | NOT NULL      | Nome do cliente             |
| valor        | Float        | NOT NULL      | Valor do pedido             |
| data_criacao | DateTime     | DEFAULT NOW() | Data de criação do pedido   |
| descricao    | String(200)  | NULL         | Descrição do pedido         |

**Observações:**
- PK = Primary Key (Chave Primária)
- O campo `id` é gerado automaticamente usando UUID
- O campo `data_criacao` é preenchido automaticamente com a data/hora atual
- O campo `descricao` é opcional
