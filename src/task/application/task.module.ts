import { Module } from '@nestjs/common';
import { TaskInfrastructureModule } from '../infrastructure';

@Module({
  imports: [TaskInfrastructureModule],
  controllers: [],
  providers: [],
})
export class TaskModule {}
