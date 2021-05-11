import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from '../entity/user.entity';
import { Auction } from '../../../core/models/auction.model';
import { User } from '../../../core/models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private userDBModel: Model<UserEntity>,
  ) {
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userDBModel.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user: User = await this.userDBModel.findById(id);
    return user;
  }

  async addAUser(user: User): Promise<User> {
    const createdUser = new this.userDBModel(user);
    const userEntitySaved = await createdUser.save();
    const userToReturn: User = {
      id: userEntitySaved._id,
      name: userEntitySaved.name,
      email: userEntitySaved.email,
      isAdmin: userEntitySaved.isAdmin,
    };
    console.log('entiy saved', userToReturn);
    return userToReturn;
  }

  async deleteUser(id: string): Promise<User> {
    const deleted = await this.userDBModel.findByIdAndRemove(id);
    return deleted;
  }

  async updateUser(user: User): Promise<User> {
    const update = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const updatedUser = await this.userDBModel.findByIdAndUpdate(
      user.id,
      update,
      { new: true },
    );
    return updatedUser;
  }
}
