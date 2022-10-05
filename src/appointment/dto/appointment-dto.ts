import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  @ApiProperty({ description: 'The date of the appointment' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'The content of the appointment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'The visited of the appointment' })
  @IsNotEmpty()
  @IsBoolean()
  visited: boolean = false;

  @ApiProperty({ description: 'The doctor supertokensID of the appointment' })
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @ApiProperty({ description: 'The user supertokensID of the appointment' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The serviceId of the appointment' })
  @IsNotEmpty()
  @IsNumber()
  serviceId: number;
}
