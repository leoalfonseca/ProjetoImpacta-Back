# Generic Project

## Overview

Projeto para conclusão do curso de ADS da Faculdade Impacta

Atualmente conta com 3 módulo: 

Autenticação, usando JWT Token para validação de usuário ; 

Usuários, CRUD completo de criação de usuários ; 

Calendário, CRUD completo de criação de eventos

## Features

- Auth Module
- Users Module
- Calendar Modulee

## Tech Stack

- Nest
- Typescript
- Criptografia
- Jest

## Como usar

<!-- #default-branch-switch -->

Exemplo de .env.development:

```sh
DB_HOST=localhost              
DB_PORT=5432                  
DB_USER=postgres        
DB_PASS=1234            
DB_NAME=project_db
COOKIE_KEY=asdasdasd
SECRET_KEY=ZmVkYWY3ZDg4NjNiNDhlMTk3YjkyODdkNDkyYjdcwOGU=
JWT_SECRET=h9G%jw13LPv$x9wHD7Q!59SKy^QqY8#4@Lm^k8lGfPj&NvWx

```

Exemplo de .env.test:

```sh
DB_HOST=localhost              
DB_PORT=5432                  
DB_USER=postgres        
DB_PASS=1234            
DB_NAME=project_db
COOKIE_KEY=asdasdasd
SECRET_KEY=ZmVkYWY3ZDg4NjNiNDhlMTk3YjkyODdkNDkyYjdcwOGU=
JWT_SECRET=h9G%jw13LPv$x9wHD7Q!59SKy^QqY8#4@Lm^k8lGfPj&NvWx


```

Clonar e rode os seguintes comandos no terminal:

```sh
npm install
npm run dev
```
