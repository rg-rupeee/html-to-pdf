import fs from 'fs';
import wkhtmltopdf from 'wkhtmltopdf';
import path from 'path';

import logger from '@/utils/logger';

class HtmlToPdfService {
  private baseFilePath = path.join(__dirname, '../../../temp');
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

  public createPdfFromUrl = async (url: string) => {
    const filepath = path.join(this.baseFilePath, 'output.pdf');
    wkhtmltopdf(url, this.wkhtmltopdfConfig, function (err, stream) {
      if (err) {
        logger.error(err);
        return;
      }

      stream.pipe(fs.createWriteStream(filepath));
    });

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
