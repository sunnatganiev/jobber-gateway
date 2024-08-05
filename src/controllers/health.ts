import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

export class Health {
  public health(_req: Request, res: Response): void {
    res.status(StatusCodes.OK).send('API Gateway service is healthy and OK.');
  }
}
