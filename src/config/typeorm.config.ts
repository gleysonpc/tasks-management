import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as config from 'config';

type DBConfig = {
  type: 'postgres';
  port: 5432;
  database: 'taskmanagement';
  host: 'postgres';
  username: 'postgres';
  password: 'admin';
  syncronize: true;
};

const dbConfig = config.get<DBConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: Boolean(process.env.TYPEORM_SYNC) || dbConfig.syncronize,
};
