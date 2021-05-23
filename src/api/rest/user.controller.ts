import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/core/models/user.model';
import { UserService } from 'src/core/services/user.service';
import { NewUserDTO } from './dtos/newUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const user: User = await this.userService.getUserById(id);
      if (user) {
        return user;
      }
      throw new BadRequestException('user doesnt exist');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  async createUser(@Body() newUser: NewUserDTO): Promise<User> {
    try {
        const user = await this.userService.createUser(newUser);
        if (user) {
          return user;
        }
        throw new BadRequestException('cannot create user');
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.userService.deleteUser(id);
      if (user) {
        return user;
      }
      throw new BadRequestException('user doesnt exist');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
