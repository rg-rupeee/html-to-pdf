import 'reflect-metadata';
import hpp from 'hpp';
import cors from 'cors';
import http from 'http';
import YAML from 'yamljs';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';
import swaggerUi from 'swagger-ui-express';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import express, { Request, Response } from 'express';

import routes from '@modules/index';
import Config from '@/config/Environment';
import logger, { stream } from '@utils/logger';
import { connectDatabases } from './databases';
import { Routes } from './interfaces/routes.interface';
import errorHandler from '@middlewares/error.middleware';
import { resolve } from 'path';

class App {
  public app: express.Application;
  public port: string | number;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.port = Config.envVars.PORT;
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server listening on port :: ${this.port}`);
    });
    return this.server;
  }

  public async initializeApp() {
    await this.validateEnvironmentConfig();
    this.initializeMiddlewares();
    this.registerRoutes();
    await this.connectDatabases();
    this.registerProcessEventHandlers();
  }

  private async connectDatabases() {
    logger.info('connecting to databases ...');
    await connectDatabases();
  }

  private registerProcessEventHandlers() {
    process.on('SIGTERM', () => {
      logger.error('SIGTERM RECEIVED. Shutting down gracefully');
      this.server.close(() => {
        logger.info('Process terminated!');
      });
    });

    process.on('SIGINT', () => {
      logger.error('SIGTERM RECEIVED. Shutting down gracefully');
      this.server.close(() => {
        logger.info('Process terminated!');
      });
    });
  }

  private async validateEnvironmentConfig() {
    logger.info('validating environment configuration');
    await Config.validate();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(xss());
    this.app.use(hpp());
    this.app.use(mongoSanitize());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(morgan(Config.envVars.MORGAN_LOG_LEVEL, { stream }));
  }

  private registerRoutes() {
    const swaggerDocument = YAML.load(
      resolve(`${__dirname}/docs/html-pdf.yaml`),
    );
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    routes.forEach((route: Routes) => {
      logger.debug(`API Loaded: ${route.path}`);
      this.app.use(`/api/${route.version}/${route.path}`, route.router);
    });

    this.app.all('*', (req: Request, res: Response) => {
      return res.status(404).json({
        success: false,
        status: 'fail',
        message: `Cannot find ${req.originalUrl} on this server!`,
      });
    });

    this.app.use(errorHandler);
  }
}

export default App;
