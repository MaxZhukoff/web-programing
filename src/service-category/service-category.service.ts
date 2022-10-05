import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategory } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ServiceCategoryDto } from './dto/serviceCategory-dto';

@Injectable()
export class ServiceCategoryService {
  constructor(public readonly prismaService: PrismaService) {}

  async findServiceCategory(id: number) {
    const serviceCategory = await this.prismaService.serviceCategory.findUnique(
      {
        where: { id },
      },
    );
    if (!serviceCategory) {
      throw new NotFoundException('Service Category not found');
    }
    return serviceCategory;
  }

  async findServiceCategories() {
    return await this.prismaService.serviceCategory.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createServiceCategory(
    dto: ServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.prismaService.serviceCategory.create({
      data: dto,
    });
  }

  async updateServiceCategory(
    id: number,
    dto: ServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.prismaService.serviceCategory.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteServiceCategory(id: number): Promise<ServiceCategory> {
    return this.prismaService.serviceCategory.delete({
      where: {
        id,
      },
    });
  }
}
