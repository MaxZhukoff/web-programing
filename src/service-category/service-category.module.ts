import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ServiceCategoryService, PrismaService],
  controllers: [ServiceCategoryController],
  exports: [PrismaService],
})
export class ServiceCategoryModule {}
