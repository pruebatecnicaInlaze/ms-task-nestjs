import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreModule } from './store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mi_usuario',
      database: 'mi_contraseña',
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule, StoreModule],
})
export class TaskInfrastructureModule {}
