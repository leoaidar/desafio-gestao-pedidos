# Sistema de Gestão de Pedidos

### **Objetivo**  
Criar um sistema de gestão de pedidos utilizando **Next.js (100% client-side)**, um **backend em Python**, uma **API REST** e um banco de dados **SQL**.  

O sistema deve permitir o cadastro, edição, listagem e remoção de pedidos e exibir um **indicador calculado no backend**.

## Tecnologias Utilizadas

- **Python**
- **SQLite** 
- **Next.js** (100% Client-Side)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI Shadcn** (para componentes)
- **React Hook Form** (para gerenciamento de formulários)


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



# Frontend do Sistema de Gestão de Pedidos

Este projeto é um sistema de gestão de pedidos desenvolvido com Next.js, utilizando uma API REST para operações CRUD. O sistema permite o cadastro, edição, listagem e remoção de pedidos, além de exibir indicadores calculados no backend.

## Tecnologias Utilizadas

- **Next.js** (100% Client-Side)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI Shadcn** (para componentes)
- **React Hook Form** (para gerenciamento de formulários)

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixar o Node.js [aqui](https://nodejs.org/).

## Configuração do Projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a API em `http://localhost:5000`, Veja as instruções do Backend.

3. Execute o projeto:

   Para desenvolvimento:

   ```bash
   npm run dev
   ```

   Para produção:

   ```bash
   npm run build
   npm run start
   ```

## Funcionalidades

- **Cadastro de Pedidos**: Permite adicionar novos pedidos através de um formulário.
- **Edição de Pedidos**: Permite editar pedidos existentes.
- **Listagem de Pedidos**: Exibe todos os pedidos cadastrados em uma tabela.
- **Remoção de Pedidos**: Permite excluir pedidos.
- **Indicadores**: Exibe a média de pedidos por cliente e o total de pedidos.
