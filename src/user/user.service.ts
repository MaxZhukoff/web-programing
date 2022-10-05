import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/user-dto';
import supertokens, { deleteUser } from 'supertokens-node';

@Injectable()
export class UserService {
  constructor(public readonly prismaService: PrismaService) {}

  async findUserBySupertokensID(supertokensID: string) {
    const user = await this.prismaService.user.findFirst({
      where: { supertokensID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUsers() {
    return await this.prismaService.user.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createUser(dto: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: dto,
    });
  }

  async updateUser(id: number, dto: UserDto): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async updateUserBySupertokensId(dto: UserDto): Promise<User> {
    const supertokensID = dto.supertokensID
    return this.prismaService.user.update({
      where: {
        supertokensID,
      },
      data: dto,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prismaService.user
      .delete({
        where: {
          id,
        },
      })
      .then(async (user) => {
        await deleteUser(user.supertokensID);
        return user;
      });
  }
}
