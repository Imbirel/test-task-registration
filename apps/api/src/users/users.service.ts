import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '#prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUser,
  type PaginationQuery,
  UserResponseSchema,
} from '@packages/validation';
import { UserResponseDto } from '#users/dto/users.dto';
import z from 'zod';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private readonly userSelect = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private prisma: PrismaService) {}

  async create(data: CreateUser): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
      select: this.userSelect,
    });

    return UserResponseSchema.parse(user);
  }

  async findAllPaginated(query: PaginationQuery) {
    const { page, limit } = query;
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: this.userSelect,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      items: z.array(UserResponseSchema).parse(users),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Удаление пользователя с ID: ${id}`);
    await this.prisma.user.delete({ where: { id } });
  }
}
