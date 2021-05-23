import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginDto: LoginDTO): Promise<User> {
        try {
            const user = await this.authService.login(loginDto);
            if (user) {
                return user;
            }
            throw new BadRequestException('invalid credentials');
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
