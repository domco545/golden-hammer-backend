import { Injectable } from '@nestjs/common';
import { NewUserDTO } from 'src/api/rest/dtos/newUser.dto';
import { UserRepository } from 'src/infrastructure/mongo/repository/user.repository';
import { AuthHelper } from '../helper/auth.helper';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private authHelper: AuthHelper){}

    async getUserById(id: string): Promise<User>{
        return await this.userRepository.getUser(id);
    }

    async getAllUsers(): Promise<User[]>{
        return await this.userRepository.getAllUsers();
    }

    async createUser(newUser: NewUserDTO): Promise<User>{
        const hash = await this.authHelper.hashPassword(newUser.password)
        newUser.password = hash;
        return await this.userRepository.addAUser(newUser);
    }

    async deleteUser(id: string): Promise<User>{
        return await this.userRepository.deleteUser(id);
    }
}
