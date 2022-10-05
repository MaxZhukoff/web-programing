import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { DoctorDto } from './dto/doctor-dto';

@Injectable()
export class DoctorService {
  constructor(public readonly prismaService: PrismaService) {}

  async findDoctorBySupertokensID(userSupertokensID: string) {
    const doctor = await this.prismaService.doctor.findFirst({
      where: { userSupertokensID },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findDoctor(id: number) {
    const doctor = await this.prismaService.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findDoctors() {
    return await this.prismaService.doctor.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createDoctor(dto: DoctorDto): Promise<Doctor> {
    return this.prismaService.doctor.create({
      data: dto,
    });
  }

  async updateDoctor(id: number, dto: DoctorDto): Promise<Doctor> {
    return this.prismaService.doctor.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteDoctor(id: number): Promise<Doctor> {
    return this.prismaService.doctor.delete({
      where: {
        id,
      },
    });
  }
}
