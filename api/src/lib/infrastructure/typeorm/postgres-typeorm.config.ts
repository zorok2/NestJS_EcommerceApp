/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const TypeOrmPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get<string>('app.database.host', 'localhost'),
    port: configService.get<number>('app.database.port', 5432),
    username: configService.get<string>('app.database.username', 'postgres'),
    password: configService.get<string>('app.database.password', 'postgres'),
    database: configService.get<string>(
      'app.database.databaseName',
      'postgres',
    ),
    autoLoadEntities: true,
    synchronize: true,
  };
};
