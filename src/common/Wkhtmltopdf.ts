import wkhtmltopdf from 'wkhtmltopdf';

class Wkhtmltopdf {
  private config;
  constructor(config?) {
    this.config = config || {
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
  }

  public htmltopdf(input, cb) {
    wkhtmltopdf(input, this.config, cb);
  }
}

export default Wkhtmltopdf;
