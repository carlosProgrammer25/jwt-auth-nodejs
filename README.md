JWT Auth Node.js
Projeto simples em Node.js que usa JWT para autenticação. Tem rotas públicas e privadas e valida token para proteger as rotas.

Tecnologias usadas
Node.js – servidor e lógica do projeto
Express – cria rotas e trata requisições
JWT (jsonwebtoken) – gera e valida tokens
dotenv – armazena porta e chave secreta em .env
Nodemon – para desenvolvimento

O servidor vai rodar em http://localhost:3000

Crie o arquivo .env com:
PORT=3000
SECRET_KEY=meusegredo123
