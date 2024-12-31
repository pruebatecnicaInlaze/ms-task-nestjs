import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreModule } from './store';
import { HttpAxiosModule } from './http';
import { environment } from '../../config/environment.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.database,
      synchronize: true,
      autoLoadEntities: true,
    }),
    StoreModule,
    HttpAxiosModule,
  ],
  exports: [TypeOrmModule, StoreModule, HttpAxiosModule],
})
export class TaskInfrastructureModule {}
