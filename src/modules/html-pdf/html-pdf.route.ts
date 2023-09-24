import { Router } from 'express';
import multer from 'multer';

import { Routes } from '@interfaces/routes.interface';
import HtmlToPdfController from './html-pdf.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { urlToPdfDTO, dataToPdfDTO, fileToPdfDTO } from './html-pdf.dto';

class HealthCheckRoute implements Routes {
  public path = 'html-pdf';
  public version = 'v1';
  public router = Router();

  private controller = new HtmlToPdfController();
  private multer = multer();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/wkhtmltopdf/url',
      validationMiddleware(urlToPdfDTO, 'body'),
      this.controller.createPdfFromUrl,
    );

    this.router.post(
      '/wkhtmltopdf/data',
      validationMiddleware(dataToPdfDTO, 'body'),
      this.controller.createPDFFromData,
    );

    this.router.post(
      '/wkhtmltopdf/file',
      this.multer.single('file'),
      validationMiddleware(fileToPdfDTO, 'body'),
      this.controller.createPDFFromFile,
    );
  }
}

export default HealthCheckRoute;
