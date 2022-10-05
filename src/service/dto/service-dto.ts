import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
  @ApiProperty({ description: 'The title of the service' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The price of the service' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "The doctor's Specialization of the service",
  })
  @IsString()
  @IsNotEmpty()
  doctorSpecialization: string;

  @ApiProperty({ description: 'The category ID of the service' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
