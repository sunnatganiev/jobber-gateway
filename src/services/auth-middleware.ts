import { config } from '@gateway/config';
import { BadRequestError, type IAuthPayload, NotAuthorizedError } from '@sunnatganiev/jobber-shared';
import { verify } from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available. Please login again', 'GatewayService verifyUser() method error');
    }

    try {
      const payload: IAuthPayload = verify(req.session?.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError(
        'Token is not available. Please login again',
        `GatewayService verifyUser() method invalid session error: ${error}`
      );
    }

    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new BadRequestError('Authentication is required to access this route', 'GatewayService checkAuthentication() method error');
    }
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
