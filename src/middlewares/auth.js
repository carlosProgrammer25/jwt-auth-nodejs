import jwt from 'jsonwebtoken'

import dotenv from "dotenv";
// Carrega as variáveis do .env
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;


// Middleware para autenticar o token e verificar permissão do usuário
//Middleware roda depois que o servidor recebe a requisicao e antes da rota
export const validarToken = (req, res, next) => {
  //pegando valor do campo authorization no header da requisicao
  const token = req.headers['authorization'];

  //se  o campo nao existir na req
  if (!token) return res.status(403).json({ message: 'Token não fornecido!' });

  //Validando o token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido!' });
    //se token estiver correto, decodifica os dados (esses dados são definidos ao criar o token) e retorna no parâmetro user, que depois eu armazeno em req.user
    req.user = user;

    //se o token for valido, pula para proxima middleware ou função da rota (que foi chamada na na rota)
    next(); 
  });
};