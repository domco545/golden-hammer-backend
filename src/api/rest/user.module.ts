import { Module } from '@nestjs/common';
import { AuthHelper } from 'src/core/helper/auth.helper';
import { UserService } from 'src/core/services/user.service';
import { MongoModule } from 'src/infrastructure/mongo/mongo.module';
import { usersProviders } from 'src/infrastructure/mongo/providers/user.providers';
import { UserRepository } from 'src/infrastructure/mongo/repository/user.repository';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, AuthHelper, ...usersProviders],
    imports: [MongoModule]
})
export class UserModule {}
