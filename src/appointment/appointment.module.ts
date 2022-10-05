import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AppointmentService, PrismaService],
  controllers: [AppointmentController],
  exports: [PrismaService],
})
export class AppointmentModule {}
