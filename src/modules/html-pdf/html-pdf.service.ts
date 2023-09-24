import axios from 'axios';
import FormData from 'form-data';
import wkhtmltopdf from 'wkhtmltopdf';

import logger from '@/utils/logger';

class HtmlToPdfService {
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
    try {
      wkhtmltopdf(url, this.wkhtmltopdfConfig, async (err, stream) => {
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

  private postFile = async (id: string, fileStream, callbackUri: string) => {
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
    }

    return true;
  };
}

export default HtmlToPdfService;
