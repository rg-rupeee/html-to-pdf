import sqlDataSource from './mySQL/data-source';
import logger from '@/utils/logger';

const connections: { mysql?: any } = {};

const connectDatabases = async () => {
  connections.mysql = await sqlDataSource.initialize();
  logger.info('Successfully connected to MYSQL Database');
};

export { connections, connectDatabases, sqlDataSource };
