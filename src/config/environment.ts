import logger from '@utils/logger';
import { validationPipe, IsString } from '@utils/validation';

class Environment {
  @IsString()
  NODE_ENV: string;

  @IsString()
  PORT: string;

  @IsString()
  MYSQL_HOST: string;

  @IsString()
  MYSQL_PORT: string;

  @IsString()
  MYSQL_USERNAME: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;

  @IsString()
  LOG_LEVEL: string;

  @IsString()
  MORGAN_LOG_LEVEL: string;
}

class Config {
  public static envVars: any = {};

  static {
    this.envVars.NODE_ENV = process.env.NODE_ENV;
    this.envVars.PORT = process.env.PORT;
    this.envVars.LOG_LEVEL = process.env.LOG_LEVEL;
    this.envVars.MORGAN_LOG_LEVEL = process.env.MORGAN_LOG_LEVEL;
    this.envVars.MYSQL = {
      HOST: process.env.MYSQL_HOST,
      PORT: process.env.MYSQL_PORT,
      USERNAME: process.env.MYSQL_USERNAME,
      PASSWORD: process.env.MYSQL_PASSWORD,
      DATABASE: process.env.MYSQL_DATABASE,
    };
  }

  public static async validate() {
    const result = await validationPipe(Environment, process.env);
    if (result !== true) {
      logger.error(result);
      throw new Error('Error While configuring environment variables');
    }
  }

  public static getEnvVar(name: string) {
    return Config.envVars[name];
  }
}

export default Config;
