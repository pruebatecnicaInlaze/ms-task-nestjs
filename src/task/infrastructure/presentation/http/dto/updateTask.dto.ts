import { RegisterTaskDto } from './registerTask.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { StatusTask } from '../../../../domain';

export class UpdateTaskDto extends PartialType(RegisterTaskDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Done',
    description: 'The status of the task',
    required: false,
    default: StatusTask.TO_D0,
    enum: StatusTask,
  })
  status?: StatusTask;
}
