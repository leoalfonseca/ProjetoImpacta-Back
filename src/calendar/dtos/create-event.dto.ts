import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  allDay?: boolean;

  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @IsNotEmpty()
  @IsDateString()
  end: Date;

  @IsOptional()
  @IsString()
  color?: string;
}
