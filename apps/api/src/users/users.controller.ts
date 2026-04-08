import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import {
  ApiListResponse,
  ApiPaginatedResponse,
} from '#common/decorators/api-response.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiPaginatedResponse(RegistrationDto)
  @ApiResponse({ status: 400, description: 'Ошибка валидации полей' })
  @ApiResponse({ status: 409, description: 'Email уже занят' })
  create(@Body() data: RegistrationDto) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  @ApiListResponse(RegistrationDto)
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь удален' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
