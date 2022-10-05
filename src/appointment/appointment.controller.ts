import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  ParseIntPipe,
  Put, UseGuards
} from "@nestjs/common";
import { Appointment, Role } from "@prisma/client";
import { AppointmentService } from './appointment.service';
import { ApiBasicAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppointmentDto } from './dto/appointment-dto';
import { Roles } from "../auth/roles.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @ApiOperation({
    summary: 'Get appointment',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully returned.',
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @Get(':id')
  async getAppointment(
    @Param('id')
    id: number,
  ): Promise<Appointment> {
    return await this.appointmentService.findAppointment(id);
  }

  @ApiOperation({
    summary: 'Get all appointments',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment were successfully returned.',
    type: AppointmentDto,
  })
  @Get()
  async getServiceCategories() {
    return await this.appointmentService.findAppointments();
  }

  @ApiOperation({
    summary: 'Create appointment',
  })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created',
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @Post()
  async createService(
    @Body() appointment: AppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentService.createAppointment(appointment);
  }

  @ApiOperation({
    summary: 'Update appointment',
  })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully updated.',
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN, Role.DOCTOR)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: AppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentService.updateAppointment(id, appointment);
  }

  @ApiOperation({
    summary: 'Delete appointment',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully deleted.',
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN, Role.DOCTOR)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAppointment(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Appointment> {
    return await this.appointmentService.deleteAppointment(id);
  }
}
