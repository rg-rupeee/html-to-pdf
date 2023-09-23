import fs from 'fs';
import wkhtmltopdf from 'wkhtmltopdf';

import logger from '@/utils/logger';

class HtmlToPdfService {
  public createPdfFromUrl = async (url: string) => {
    wkhtmltopdf(
      url,
      {
        pageSize: 'letter',
        enableLocalFileAccess: true,
        loadErrorHandling: 'ignore',
        loadMediaErrorHandling: 'ignore',
        debugJavascript: true,
        encoding: 'utf-8',
        enableForms: true,
        javascriptDelay: 1000,
        enablePlugins: true,
      },
      function (err, stream) {
        if (err) {
          logger.error(err);
          return;
        }

        stream.pipe(fs.createWriteStream('output.pdf'));
      },
    );
    return { success: true };
  };

  public createPdf = async () => {
    wkhtmltopdf(
      fs.createReadStream('Google.html'),
      {
        pageSize: 'letter',
        enableLocalFileAccess: true,
        loadErrorHandling: 'ignore',
        loadMediaErrorHandling: 'ignore',
      },
      function (err, stream) {
        // do whatever with the stream
        if (err) {
          console.log(err);
        }
        stream.pipe(fs.createWriteStream('output.pdf'));
      },
    );
    return true;
  };
}

export default HtmlToPdfService;
