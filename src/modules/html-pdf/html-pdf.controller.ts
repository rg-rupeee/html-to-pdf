/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

class HtmlToPdfController {
  public createPdf = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    return res.status(201).json({
      message: 'Hello World!',
    });
  };
}

export default HtmlToPdfController;
