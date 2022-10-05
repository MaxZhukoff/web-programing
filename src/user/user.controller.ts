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
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { ApiBasicAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from './dto/user-dto';
import { Role } from "@prisma/client";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Update user by SupertokensId',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
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
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'This email is already taken',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Put('/supertokensID')
  async updateUserBySupertokensId(
    @Body() user: UserDto,
  ): Promise<User> {
    return await this.userService.updateUserBySupertokensId(user);
  }

  @ApiOperation({
    summary: 'Find user by supertokensID',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully returned.',
    type: UserDto,
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
    description: 'User not found',
  })
  @Get('supertokensID::supertokensID')
  async findPlanCategory(
    @Param('supertokensID') supertokensID: string,
  ): Promise<User> {
    return await this.userService.findUserBySupertokensID(supertokensID);
  }

  @ApiOperation({
    summary: 'Get user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully returned.',
    type: UserDto,
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
    description: 'User not found',
  })
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return await this.userService.findUser(id);
  }

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users were successfully returned.',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.findUsers();
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'This email is already taken',
  })
  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
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
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'This email is already taken',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, user);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
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
    description: 'User not found',
  })
  @ApiBasicAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
