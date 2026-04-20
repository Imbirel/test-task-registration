import { UsersService } from './users.service.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  PaginationQueryDto,
  UserResponseDto,
} from './dto/users.dto.js';
import {
  ApiBaseResponse,
  ApiPaginatedResponse,
} from '#common/decorators/api-response.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBaseResponse(UserResponseDto, {
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно создан',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации',
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email уже занят' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Получить список всех пользователей с пагинацией',
  })
  @ApiPaginatedResponse(UserResponseDto, {
    status: HttpStatus.OK,
    description: 'Список всех пользователей',
  })
  async findAllPaginated(@Query() query: PaginationQueryDto) {
    return this.usersService.findAllPaginated(query);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Пользователь успешно удалён',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
