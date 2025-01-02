import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the task',
    type: String,
    example: 'Implement a new feature',
  })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the task',
    type: String,
    example: 'This task will be implemented by the end of the sprint.',
  })
  public description: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: 'The deadline of the task',
    type: 'string',
    format: 'date-time',
    example: '2023-12-31',
  })
  public limitDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the user assigned to the task',
    type: String,
    example: 'user1',
  })
  public userId?: string;
}
