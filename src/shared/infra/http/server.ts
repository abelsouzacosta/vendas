import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '../../errors/AppError';
import { errors } from 'celebrate';
import router from './routes/';
import '@shared/infra/typeorm';
import '@shared/container';
import 'dotenv/config';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.use(errors());

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
      message: error.message,
    });
  },
);

app.listen(process.env.PORT);
