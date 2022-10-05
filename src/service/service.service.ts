import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ServiceDto } from './dto/service-dto';

@Injectable()
export class ServiceService {
  constructor(public readonly prismaService: PrismaService) {}

  async findService(id: number) {
    const service = await this.prismaService.service.findUnique({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }

  async findServices() {
    return await this.prismaService.service.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createService(dto: ServiceDto): Promise<Service> {
    return this.prismaService.service.create({
      data: dto,
    });
  }

  async updateService(id: number, dto: ServiceDto): Promise<Service> {
    return this.prismaService.service.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteService(id: number): Promise<Service> {
    return this.prismaService.service.delete({
      where: {
        id,
      },
    });
  }
}
