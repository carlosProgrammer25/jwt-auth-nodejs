//criar o servidor e rotas
import express from "express";
//cria um token unico
import jwt from "jsonwebtoken";
import * as middleware from "./src/middlewares/auth.js";

import dotenv from "dotenv";
// Carrega as variáveis do .env
dotenv.config();


//instanciando o servidor http
const app = express();
const port = process.env.PORT;



//quando chegar a requisicao, tenta ler o corpo(se existir) como json
app.use(express.json());

const users = [
  { id: 1, username: 'carlos', password: '12345678', role: 'admin' },
  { id: 2, username: 'felipe', password: '12345678', role: 'user' }
];

//rota para realizar a autenticacao e gerar o token-jwt
app.post('/login', (req, res) => {
  //{} => desestruturação de objeto (object destructuring);

  //const username = req.body.username;
  //const password = req.body.password;
  const { username, password } = req.body;

  // ARRAY.find(cada Item Do Array Por vez => valor que vem do array > condicao > valor a ser encontrado )
  // find retorna apenas o primeiro valor que atende à condição    
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  //user entra existe conteudo(truthy)
  if (user) {
    //se existir usuario
    //criando token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, middleware.SECRET_KEY);

    return res.status(201).json({
      "message":"token criado",
      "mesagem": token
    });
  } else {
    res.status(401).json({ 'message': 'erro senha ou usuario' });
  };

});



// Rota autenticada
//middleware sendo chamada para validacao de dados
app.get('/protected', middleware.validarToken, (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à rota autenticada!' });
});

// Rota autenticada e privada para o usuario admin
app.get('/admin', middleware.validarToken, (req, res) => {
  //se o usuario nao for admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado!' });
  };

  res.status(200).json({ message: 'Bem-vindo à área administrativa!' });
});

//app.listen() cria (por baixo) e inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});