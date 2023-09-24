/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import HtmlToPdfService from './html-pdf.service';
import { MulterRequest } from '@interfaces/request.interface';
import { urlToPdfDTO, dataToPdfDTO, fileToPdfDTO } from './html-pdf.dto';

class HtmlToPdfController {
  private service = new HtmlToPdfService();

  public createPdfFromUrl = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { url, callbackUri } = req.body as urlToPdfDTO;

    const data = await this.service.createPdfFromUrl(url, callbackUri);

    return res.status(201).json({ success: true, data });
  };

  public createPDFFromData = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { fileData, callbackUri } = req.body as dataToPdfDTO;

    const data = await this.service.createPDFFromData(fileData, callbackUri);

    return res.status(201).json({ success: true, data });
  };

  public createPDFFromFile = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { file } = req as MulterRequest;
    const { callbackUri } = req.body as fileToPdfDTO;

    if (!file)
      return res
        .status(400)
        .json({ success: false, message: 'please provide file' });

    const data = await this.service.createPDFFromFile(file, callbackUri);

    return res.status(201).json({ success: true, data });
  };
}

export default HtmlToPdfController;
