import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '#prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegistrationData } from '@packages/validation';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: RegistrationData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    this.logger.log(`Удаление пользователя с ID: ${id}`);
    return await this.prisma.user.delete({ where: { id } });
  }
}
