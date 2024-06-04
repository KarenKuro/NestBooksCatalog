import { DBPASSWORD, DBPORT, DBUSERNAME } from 'config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: DBPORT,
  username: DBUSERNAME,
  password: DBPASSWORD,
  database: 'books_catalog',
  entities: [__dirname + '**/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
