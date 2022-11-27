## Agendas

Projeto de desenvolvimento com o intuito de aprender os conceitos para trabalhar com Nest.js + Prisma.
Trabalhamos também com conceitos de autenticação, filtragem de buscas, documentação de projetos e bancos de dados relacionais.

## Pré -Requisitos

•	Node com versão superior ou igual que 16.15.0 - Node Download
•	NPM com versão superior ou igual que 8.5.5 - Npm Download
•	Nest.js com versão superior ou igual que 8.5.5 - Nest Download
•	PostgreSQL com versão superior ou igual que 8.2.6 - PostgreSQL Download

##Instalação

Clone esse projeto em seu computador com o comando (Chave SSH necessária):
#!/bin/bash
$ git clone git@github.com:tatylima/agendas.git
Acesse a pasta do projeto:
#!/bin/bash
$ cd agendas
Instale as dependências com o seguinte comando:
#!/bin/bash
$ npm install

## Execução

Após ter instalado as dependências, use o seguinte comando para rodar o projeto em um servidor local:
#!/bin/bash
$ yarn start
Para conseguir trabalhar com o banco de dados você deverá criar um arquivo .env e adicionar uma url de conexão com seu Postgres local com a chave DATABASE_URL.
DATABASE_URL="postgresql://postgres:admin@localhost:5432/agendas"

## Funcionalidades

Para acessar a lista de endpoints e funcionalidades da aplicação, acesse nossa documentação do Swagger, lá você poderá testar todas as rotas.
Você também pode analisar nosso Diagrama de Relacionamento de Entidades

##Autores

•	Tatiana de lima Gandra
•	Turma C017 - Blue EdTech