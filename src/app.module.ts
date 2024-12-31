import { Module } from '@nestjs/common';
import { TaskModule } from './task';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
