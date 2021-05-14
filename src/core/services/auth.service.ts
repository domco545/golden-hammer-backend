import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/api/rest/dtos/login.dto';
import { UserRepository } from 'src/infrastructure/mongo/repository/user.repository';
import { AuthHelper } from '../helper/auth.helper';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private authHelper: AuthHelper) {}

    async login(loginDto: LoginDTO): Promise<User>{
        const userData = await this.userRepository.loginUser(loginDto.email)
        const passwordMatch = await this.authHelper.comparePassword(loginDto.password, userData.password)
        if (passwordMatch) {
            return await this.userRepository.getUser(userData.id);
        }
        return null;
    }
}
