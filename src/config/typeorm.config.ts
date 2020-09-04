import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'placeholder', // Committed with placeholder
  password: 'placeholder', // Committed with placeholder
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Set this to false in production
};
