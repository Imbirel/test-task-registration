import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegistrationData } from '@packages/validation';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: RegistrationData) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
        },
        select: { id: true, email: true, name: true },
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Пользователь с таким email уже зарегистрирован',
          );
        }
      }
      this.logger.error(error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true },
      orderBy: { id: 'desc' },
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Пользователь с ID ${id} не найден`);
        }
      }
      throw error;
    }
  }
}
