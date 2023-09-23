import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import HtmlToPdfController from './html-pdf.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { urlToPdfDTO } from './html-pdf.dto';

class HealthCheckRoute implements Routes {
  public path = 'html-pdf';
  public version = 'v1';
  public router = Router();

  private controller = new HtmlToPdfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/wkhtmltopdf/url',
      validationMiddleware(urlToPdfDTO, 'body'),
      this.controller.createPdfFromUrl,
    );

    this.router.post('/wkhtmltopdf/file', this.controller.createPdfFromUrl);

    this.router.post('/wkhtmltopdf/data', this.controller.createPdfFromUrl);
  }
}

export default HealthCheckRoute;
