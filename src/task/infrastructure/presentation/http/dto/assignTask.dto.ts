import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AssignTaskDto {
  @IsString()
  @IsNotEmpty()
  public taskId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public emailUser: string;
}
