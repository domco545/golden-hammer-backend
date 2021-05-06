import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private userDBModel: Model<UserEntity>,
  ) {}

}