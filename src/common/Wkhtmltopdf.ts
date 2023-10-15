import wkhtmltopdf from 'wkhtmltopdf';

type wkhtmltopdfConfig = {
  pageSize: string;
  enableLocalFileAccess: Boolean;
  loadErrorHandling: string;
  loadMediaErrorHandling: string;
  debugJavascript: Boolean;
  encoding: string;
  enableForms: Boolean;
  javascriptDelay: Number;
  enablePlugins: Boolean;
};

class Wkhtmltopdf {
  private config: wkhtmltopdfConfig;
  constructor(config?: wkhtmltopdfConfig) {
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
