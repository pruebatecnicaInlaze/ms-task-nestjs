import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreModule } from './store';
import { HttpAxiosModule } from './http';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mi_usuario',
      password: 'mi_contraseña',
      database: 'mi_base_de_datos',
      synchronize: true,
      autoLoadEntities: true,
    }),
    StoreModule,
    HttpAxiosModule,
  ],
  exports: [TypeOrmModule, StoreModule, HttpAxiosModule],
})
export class TaskInfrastructureModule {}
