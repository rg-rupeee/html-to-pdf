/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import HtmlToPdfService from './html-pdf.service';
import { urlToPdfDTO } from './html-pdf.dto';

class HtmlToPdfController {
  private service = new HtmlToPdfService();

  public createPdfFromUrl = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { url } = req.body as urlToPdfDTO;

    const data = await this.service.createPdfFromUrl(url);

    return res.status(201).json({ success: true, data });
  };
}

export default HtmlToPdfController;
