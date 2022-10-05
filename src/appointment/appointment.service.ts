import { Injectable, NotFoundException } from '@nestjs/common';
import { Appointment } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AppointmentDto } from './dto/appointment-dto';

@Injectable()
export class AppointmentService {
  constructor(public readonly prismaService: PrismaService) {}

  async findAppointment(id: number) {
    const appointment = await this.prismaService.appointment.findUnique({
      where: {
        id: +id
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async findAppointments() {
    return await this.prismaService.appointment.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createAppointment(dto: AppointmentDto): Promise<Appointment> {
    return this.prismaService.appointment.create({
      data: dto,
    });
  }

  async updateAppointment(
    id: number,
    dto: AppointmentDto,
  ): Promise<Appointment> {
    return this.prismaService.appointment.update({
      where: {
        id
      },
      data: dto,
    });
  }

  async deleteAppointment(id: number): Promise<Appointment> {
    return this.prismaService.appointment.delete({
      where: {
        id,
      },
    });
  }
}
