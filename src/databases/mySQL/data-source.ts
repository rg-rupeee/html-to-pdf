import { DataSource } from 'typeorm';

import Config from '@/config/Environment';

const sqlDataSource = new DataSource({
  type: 'mysql',
  host: Config.envVars.MYSQL.HOST,
  port: Config.envVars.MYSQL.PORT,
  username: Config.envVars.MYSQL.USERNAME,
  password: Config.envVars.MYSQL.PASSWORD,
  database: Config.envVars.MYSQL.DATABASE,
  entities: ['src/entities/*.js'],
  logging: true,
  synchronize: true,
});

export default sqlDataSource;
