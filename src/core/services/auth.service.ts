import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/api/rest/dtos/login.dto';
import { UserRepository } from 'src/infrastructure/mongo/repository/user.repository';
import { AuthHelper } from '../helper/auth.helper';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private authHelper: AuthHelper) {}

    async login(loginDto: LoginDTO): Promise<User>{
        const hash = await this.authHelper.hashPassword(loginDto.password);
        return this.userRepository.loginUser(loginDto.email, hash);
    }
}
