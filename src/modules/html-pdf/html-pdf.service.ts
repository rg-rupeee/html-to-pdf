import axios from 'axios';
import FormData from 'form-data';
import wkhtmltopdf from 'wkhtmltopdf';

import logger from '@/utils/logger';
import { serializeError } from '@utils/common';
import { sqlDataSource } from '@databases/index';
import Log, { LogStatus, LogType } from '@/entities/Log.entity';

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
    const log = this.logRepository.create({ type: LogType.URL });
    await this.logRepository.insert(log);
    console.log(log);
    try {
      wkhtmltopdf(url, this.wkhtmltopdfConfig, async (err, stream) => {
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
    return { id: log.id };
  };

  public createPDFFromData = async (fileData: string, callbackUri: string) => {
    const log = this.logRepository.create({ type: LogType.DATA });
    await this.logRepository.insert(log);
    try {
      wkhtmltopdf(fileData, this.wkhtmltopdfConfig, async (err, stream) => {
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
    return { id: log.id };
  };

  public createPDFFromFile = async (file, callbackUri: string) => {
    const log = this.logRepository.create({ type: LogType.FILE });
    await this.logRepository.insert(log);
    try {
      wkhtmltopdf(
        Buffer.from(file.buffer),
        this.wkhtmltopdfConfig,
        async (err, stream) => {
          if (err) {
            logger.error(err);
            const parsedError = serializeError(err) as { message: string };
            await this.Log.logError(
              log.id,
              JSON.stringify(parsedError.message),
            );
            return;
          }
          await this.postFile(log.id, stream, callbackUri);
        },
      );
    } catch (err) {
      logger.info(err);
      const parsedError = serializeError(err) as { message: string };
      await this.Log.logError(log.id, JSON.stringify(parsedError.message));
    }
    return { id: log.id };
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
