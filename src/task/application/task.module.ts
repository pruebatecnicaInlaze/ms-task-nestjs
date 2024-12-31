import { Module } from '@nestjs/common';
import { TaskInfrastructureModule } from '../infrastructure';
import { FindAllTaskUseCase, RegisterTaskUseCase } from './use-cases';
import { TaskController } from '../infrastructure/presentation';

@Module({
  imports: [TaskInfrastructureModule],
  controllers: [TaskController],
  providers: [FindAllTaskUseCase, RegisterTaskUseCase],
})
export class TaskModule {}
