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
import { Role, Service } from "@prisma/client";
import { ServiceService } from './service.service';
import { ApiBasicAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ServiceDto } from './dto/service-dto';
import { Roles } from "../auth/roles.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({
    summary: 'Get service',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully returned.',
    type: ServiceDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Service not found',
  })
  @Get(':id')
  async getService(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Service> {
    return await this.serviceService.findService(id);
  }

  @ApiOperation({
    summary: 'Get all services',
  })
  @ApiResponse({
    status: 200,
    description: 'Services were successfully returned.',
    type: ServiceDto,
  })
  @Get()
  async getServiceCategories() {
    return await this.serviceService.findServices();
  }

  @ApiOperation({
    summary: 'Create service',
  })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully created.',
    type: ServiceDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createService(@Body() service: ServiceDto): Promise<Service> {
    return await this.serviceService.createService(service);
  }

  @ApiOperation({
    summary: 'Update service',
  })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully updated.',
    type: ServiceDto,
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
    description: 'Service not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: ServiceDto,
  ): Promise<Service> {
    return await this.serviceService.updateService(id, service);
  }

  @ApiOperation({
    summary: 'Delete service',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully deleted.',
    type: ServiceDto,
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
    description: 'Service not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteService(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Service> {
    return await this.serviceService.deleteService(id);
  }
}
