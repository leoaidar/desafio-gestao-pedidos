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
