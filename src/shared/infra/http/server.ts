import 'reflect-metadata';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
// routes virou um middleware
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor não previsto',
    });
  },
);

// apos as rotas, colocar middleware de tratativo de erros

app.listen(3333, () => {
  console.log('🚀🚀 INICIO DO BACKEND PORTA 3333');
});
