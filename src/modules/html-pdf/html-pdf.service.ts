import axios from 'axios';
import FormData from 'form-data';

import logger from '@/utils/logger';
import Wkhtmltopdf from '@common/Wkhtmltopdf';
import { serializeError } from '@utils/common';
import { sqlDataSource } from '@databases/index';
import Log, { LogStatus, LogType } from '@entities/Log.entity';

class HtmlToPdfService {
  private Log = Log;
  private logRepository = sqlDataSource.getRepository(Log);
  private Wkhtmltopdf = new Wkhtmltopdf();

  public createPdfFromUrl = async (url: string, callbackUri: string) => {
    const log = await this.htmlToPdf(url, callbackUri);
    return { id: log.id };
  };

  public createPDFFromData = async (fileData: string, callbackUri: string) => {
    const log = await this.htmlToPdf(fileData, callbackUri);
    return { id: log.id };
  };

  public createPDFFromFile = async (file: any, callbackUri: string) => {
    const log = await this.htmlToPdf(Buffer.from(file.buffer), callbackUri);
    return { id: log.id };
  };

  private htmlToPdf = async (input: string | any, callbackUri: string) => {
    const log = this.logRepository.create({ type: LogType.URL });
    await this.logRepository.insert(log);
    try {
      this.Wkhtmltopdf.htmltopdf(input, async (err, stream) => {
        if (err) {
          logger.error(err);
          const parsedError = serializeError(err) as { message: string };
          await this.Log.logError(log.id, JSON.stringify(parsedError.message));
          return;
        }
        await this.postFile(log.id, stream, callbackUri);
      });
    } catch (err) {
      logger.info(err);
      const parsedError = serializeError(err) as { message: string };
      await this.Log.logError(log.id, JSON.stringify(parsedError.message));
    }
    return log;
  };

  private postFile = async (
    id: number,
    fileStream: any,
    callbackUri: string,
  ) => {
    const data = new FormData();
    data.append('id', id);
    data.append('file', fileStream, { filename: 'file.pdf' });

    const reqConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: callbackUri,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      await axios.request(reqConfig);
    } catch (err) {
      logger.error(err);
      await this.Log.logError(id, 'Error Posting Data to Callback API');
      return false;
    }

    await this.logRepository.update({ id }, { status: LogStatus.COMPLETED });

    return true;
  };
}

export default HtmlToPdfService;
