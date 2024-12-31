import { PartialType } from '@nestjs/mapped-types';
import { RegisterTaskDto } from './registerTask.dto';

export class UpdateTaskDto extends PartialType(RegisterTaskDto) {}
