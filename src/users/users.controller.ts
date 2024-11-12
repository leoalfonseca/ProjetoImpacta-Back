import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(
      body.email,
      body.password,
      body.username,
      body.name,
    );
    return user;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async removeUser(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'Usuário removido com sucesso' };
  }

  @Patch('/:id')
  // @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    return user;
  }
}
