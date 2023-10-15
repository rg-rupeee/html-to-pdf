import { DataSource } from 'typeorm';

import Config from '@/config/Environment';
import Entities from '@entities/index';

const sqlDataSource = new DataSource({
  type: 'mysql',
  host: Config.envVars.MYSQL.HOST,
  port: Config.envVars.MYSQL.PORT,
  username: Config.envVars.MYSQL.USERNAME,
  password: Config.envVars.MYSQL.PASSWORD,
  database: Config.envVars.MYSQL.DATABASE,
  entities: Entities,
  logging: false,
  synchronize: false,
});

export default sqlDataSource;
