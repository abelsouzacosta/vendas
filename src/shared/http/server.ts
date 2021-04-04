import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '../errors/AppError';
import router from './routes/';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// middleware de erros da aplicação
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(400).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3030);
