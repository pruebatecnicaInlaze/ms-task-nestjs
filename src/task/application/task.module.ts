import { Module } from '@nestjs/common';
import { TaskInfrastructureModule } from '../infrastructure';
import {
  DeleteTaskUseCase,
  FindAllTaskUseCase,
  RegisterTaskUseCase,
  UpdateTaskUseCase,
} from './use-cases';
import { TaskController } from '../infrastructure/presentation';

@Module({
  imports: [TaskInfrastructureModule],
  controllers: [TaskController],
  providers: [
    FindAllTaskUseCase,
    RegisterTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class TaskModule {}
