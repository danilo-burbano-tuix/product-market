import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { DropSchemaRule } from './enums';
import { updateSchema } from './update-schema';
import { AppService } from './app.service';
import { ProductModule } from '../product/product.module';
import { defineConfig } from '@mikro-orm/postgresql';
import { Product } from '../product/product.entity';
import { runSeeds } from './run-seeders';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mikroOrmConfig = defineConfig({
          entities: [Product],
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          user: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          dbName: configService.get<string>('POSTGRES_DB'),
          debug: configService.get<boolean>('POSTGRES_DEBUG'),
        });

        await updateSchema(mikroOrmConfig, DropSchemaRule.ON_UPDATE_FAILURE);
        await runSeeds(mikroOrmConfig);

        return mikroOrmConfig;
      },
      inject: [ConfigService],
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
