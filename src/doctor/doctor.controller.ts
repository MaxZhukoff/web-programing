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
import { Doctor, Role } from "@prisma/client";
import { DoctorService } from './doctor.service';
import { ApiBasicAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DoctorDto } from './dto/doctor-dto';
import { Roles } from "../auth/roles.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: 'Find doctor by userSupertokensID',
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully returned.',
    type: DoctorDto,
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
    description: 'Doctor not found',
  })
  @Get('supertokensID::supertokensID')
  async findPlanCategory(
    @Param('userSupertokensID') userSupertokensID: string,
  ): Promise<Doctor> {
    return await this.doctorService.findDoctorBySupertokensID(userSupertokensID);
  }

  @ApiOperation({
    summary: 'Get doctor',
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully returned.',
    type: DoctorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  @Get(':id')
  async getDoctor(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Doctor> {
    return await this.doctorService.findDoctor(id);
  }

  @ApiOperation({
    summary: 'Get all doctors',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctors were successfully returned',
    type: DoctorDto,
  })
  @Get()
  async getDoctors() {
    return await this.doctorService.findDoctors();
  }

  @ApiOperation({
    summary: 'Create doctor',
  })
  @ApiResponse({
    status: 201,
    description: 'The doctor has been successfully created.',
    type: DoctorDto,
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
    description: 'Doctor for created not found',
  })
  @ApiResponse({
    status: 409,
    description: 'This user supertokensID is already taken',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createDoctor(@Body() doctor: DoctorDto): Promise<Doctor> {
    return await this.doctorService.createDoctor(doctor);
  }

  @ApiOperation({
    summary: 'Update doctor',
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully updated.',
    type: DoctorDto,
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
    description: 'Doctor not found',
  })
  @ApiResponse({
    status: 409,
    description: 'This user supertokensID is already taken',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Body() doctor: DoctorDto,
  ): Promise<Doctor> {
    return await this.doctorService.updateDoctor(id, doctor);
  }

  @ApiOperation({
    summary: 'Delete doctor',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully deleted.',
    type: DoctorDto,
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
    description: 'Doctor not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDoctor(@Param('id', ParseIntPipe) id: number): Promise<Doctor> {
    return await this.doctorService.deleteDoctor(id);
  }
}
