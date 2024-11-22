import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { logger } from '@mikro-orm/nestjs';
import { Product } from './modules/product/product.entity';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [Product],
  driver: PostgreSqlDriver,
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  logger: logger.log.bind(logger),
};

export default MikroOrmConfig;
