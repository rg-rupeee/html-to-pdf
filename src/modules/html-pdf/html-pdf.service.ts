import axios from 'axios';
import FormData from 'form-data';
import wkhtmltopdf from 'wkhtmltopdf';

import logger from '@/utils/logger';
import Log, { Status as LogStatus } from '@/entities/Log.entity';
import { sqlDataSource } from '@databases/index';

class HtmlToPdfService {
  private Log = Log;
  private logRepository = sqlDataSource.getRepository(Log);
  private wkhtmltopdfConfig = {
    pageSize: 'letter',
    enableLocalFileAccess: true,
    loadErrorHandling: 'ignore',
    loadMediaErrorHandling: 'ignore',
    debugJavascript: true,
    encoding: 'utf-8',
    enableForms: true,
    javascriptDelay: 1000,
    enablePlugins: true,
  };

  public createPdfFromUrl = async (url: string, callbackUri: string) => {
    const log = this.logRepository.create();
    await this.logRepository.insert(log);

    try {
      wkhtmltopdf(url, this.wkhtmltopdfConfig, async (err, stream) => {
        if (err) {
          logger.error(err);
          await this.Log.logError(log.id, JSON.stringify(err));
          return;
        }
        await this.postFile(log.id, stream, callbackUri);
      });
    } catch (err) {
      logger.info(err);
      await this.Log.logError(log.id, JSON.stringify(err));
    }

    return { id: log.id };
  };

  public createPDFFromData = async (fileData: string, callbackUri: string) => {
    try {
      wkhtmltopdf(fileData, this.wkhtmltopdfConfig, async (err, stream) => {
        if (err) {
          logger.error(err);
          return;
        }
        await this.postFile('asdf', stream, callbackUri);
      });
    } catch (err) {
      logger.info(err);
    }

    return { success: true };
  };

  public createPDFFromFile = async (file, callbackUri: string) => {
    try {
      wkhtmltopdf(
        Buffer.from(file.buffer),
        this.wkhtmltopdfConfig,
        async (err, stream) => {
          if (err) {
            logger.error(err);
            return;
          }
          await this.postFile('asdf', stream, callbackUri);
        },
      );
    } catch (err) {
      logger.info(err);
    }

    return { success: true };
  };

  private postFile = async (id: number, fileStream, callbackUri: string) => {
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
