import { Request, Response, Router } from 'express';

import { Routes } from '@interfaces/routes.interface';

class HealthCheckRoute implements Routes {
  public path = 'health-check';
  public version = 'v1';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.checkHeath);
  }

  private checkHeath = (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
    });
  };
}

export default HealthCheckRoute;
