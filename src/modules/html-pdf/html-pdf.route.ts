import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import HtmlToPdfController from './html-pdf.controller';

class HealthCheckRoute implements Routes {
  public path = 'html-pdf';
  public version = 'v1';
  public router = Router();

  private controller = new HtmlToPdfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.controller.createPdf);
  }
}

export default HealthCheckRoute;
