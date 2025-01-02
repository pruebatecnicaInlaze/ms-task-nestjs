import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AssignTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'f536dbb8-154c-4c14-b4e7-d684cfe10c36',
    description: 'ID of the task to be assigned',
  })
  public taskId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    format: 'email',
    example: 'john.doe@example.com',
    description: 'Email of the user to assign the task to',
  })
  public emailUser: string;
}
