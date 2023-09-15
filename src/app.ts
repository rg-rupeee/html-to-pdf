import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import morgan from 'morgan';
import logger, { stream } from './utils/logger';

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
      logger.info(`server listening on port :: ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectDatabase() {
    logger.info('connecting to database ...');
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(xss());
    this.app.use(mongoSanitize());
    this.app.use(compression());
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(morgan('combined', { stream }));
  }
}

export default App;
