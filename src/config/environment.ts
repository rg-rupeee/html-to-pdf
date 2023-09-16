import logger from '@utils/logger';
import { validationPipe, IsString } from '../utils/validation';

class Environment {
  @IsString()
  NODE_ENV: string;

  @IsString()
  PORT: string;
}

class Config {
  private static envVars: { [key: string]: string | undefined } = {};

  static {
    this.envVars.NODE_ENV = process.env.NODE_ENV;
    this.envVars.PORT = process.env.PORT;
  }

  public static async validate() {
    const result = await validationPipe(Environment, Config.envVars);
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
