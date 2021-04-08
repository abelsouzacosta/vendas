import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token not provided');

  const parts = authHeader.split(' ');

  if (parts.length !== 2) throw new AppError('Token mismatch');

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer)) throw new AppError('Token malformatted');

  try {
    const decodedToken = verify(token, String(authConfig.jwt.secret));

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new AppError(`${err}: Unauthorized`);
  }
}
