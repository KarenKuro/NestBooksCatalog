import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'books_catalog',
  password: '11031990',
  database: 'books_catalog',
  entities: [__dirname + '**/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
