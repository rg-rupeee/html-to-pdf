import logger from '../utils/logger';
import { validationPipe, IsString } from '../utils/validation';

class Environment {
  @IsString()
  NODE_ENV: string;

  @IsString()
  PORT: string;
}

class Config {
  public envVars: { [key: string]: string | number } = {};

  constructor() {
    this.envVars.NODE_ENV = process.env.NODE_ENV;
    this.envVars.PORT = process.env.PORT;
  }

  public async validate() {
    const result = await validationPipe(Environment, this.envVars);
    if (result !== true) {
      logger.error(result);
      throw new Error('Error While configuring environment variables');
    }
  }
}

export default Config;
