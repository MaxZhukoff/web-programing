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
import { Role, ServiceCategory } from "@prisma/client";
import { ServiceCategoryService } from './service-category.service';
import { ApiBasicAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ServiceCategoryDto } from './dto/serviceCategory-dto';
import { Roles } from "../auth/roles.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('service-categories')
@Controller('service-categories')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}
  @ApiOperation({
    summary: 'Get service category',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The service category has been successfully returned.',
    type: ServiceCategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Service category not found',
  })
  @Get(':id')
  async getServiceCategory(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<ServiceCategory> {
    return await this.serviceCategoryService.findServiceCategory(id);
  }

  @ApiOperation({
    summary: 'Get all service categories',
  })
  @ApiResponse({
    status: 200,
    description: 'Service categories were successfully returned.',
    type: ServiceCategoryDto,
  })
  @Get()
  async getServiceCategories() {
    return await this.serviceCategoryService.findServiceCategories();
  }

  @ApiOperation({
    summary: 'Get all categories by doctor specialization',
  })
  @ApiResponse({
    status: 200,
    description: 'Service categories were successfully returned.',
    type: ServiceCategoryDto,
  })

  @ApiOperation({
    summary: 'Create service category',
  })
  @ApiResponse({
    status: 201,
    description: 'The service category has been successfully created.',
    type: ServiceCategoryDto,
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
    description: 'Service category not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createServiceCategory(
    @Body() serviceCategory: ServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return await this.serviceCategoryService.createServiceCategory(
      serviceCategory,
    );
  }

  @ApiOperation({
    summary: 'Update service category',
  })
  @ApiResponse({
    status: 200,
    description: 'The service category has been successfully updated.',
    type: ServiceCategoryDto,
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
    description: 'Service category not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Body() serviceCategory: ServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return await this.serviceCategoryService.updateServiceCategory(
      id,
      serviceCategory,
    );
  }

  @ApiOperation({
    summary: 'Delete service category',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The service category has been successfully deleted.',
    type: ServiceCategoryDto,
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
    description: 'Service category not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteServiceCategory(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<ServiceCategory> {
    return await this.serviceCategoryService.deleteServiceCategory(id);
  }
}
