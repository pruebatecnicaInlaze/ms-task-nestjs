import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskData } from './entities';
import { TaskRepository } from '../../application';
import { TaskAdapter } from './adapter';

@Module({
  imports: [TypeOrmModule.forFeature([TaskData])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskAdapter,
    },
  ],
  exports: [TaskRepository, TypeOrmModule],
})
export class StoreModule {}
