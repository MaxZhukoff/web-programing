import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty({ description: 'The userSupertokensID of the doctor' })
  @IsNotEmpty()
  @IsString()
  userSupertokensID: string;

  @ApiProperty({ description: 'The specialization of the doctor' })
  @IsNotEmpty()
  @IsString()
  specialization: string;
}
