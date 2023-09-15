import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';

class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.connectDatabase();
    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port :: ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectDatabase() {
    console.log('connecting to database ...');
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(xss());
    this.app.use(mongoSanitize());
    this.app.use(compression());
    this.app.use(express.urlencoded({ limit: '', extended: true }));
  }
}

export default App;
