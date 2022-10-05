import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceCategoryDto {
  @ApiProperty({ description: 'The title of the service category' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
