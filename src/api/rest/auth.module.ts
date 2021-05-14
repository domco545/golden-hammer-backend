import { Module } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/mongo/mongo.module';
import { usersProviders } from 'src/infrastructure/mongo/providers/user.providers';
import { AuthService } from 'src/core/services/auth.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from 'src/core/helper/auth.helper';
import { UserRepository } from 'src/infrastructure/mongo/repository/user.repository';

@Module({
    controllers: [AuthController],
    providers: [AuthService,AuthHelper,UserRepository, ...usersProviders],
    imports: [MongoModule]
})
export class AuthModule {}
