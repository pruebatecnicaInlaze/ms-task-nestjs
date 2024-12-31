import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterTaskDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsDate()
  @IsNotEmpty()
  public limitDate: Date;

  @IsString()
  @IsOptional()
  public userId?: string;
}
