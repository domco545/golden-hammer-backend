import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from '../entity/user.entity';
import { Auction } from '../../../core/models/auction.model';
import { User } from '../../../core/models/user.model';
import { NewUserDTO } from 'src/api/rest/dtos/newUser.dto';
import { UserData } from 'src/core/models/userData.model';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private userDBModel: Model<UserEntity>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userDBModel.find().select("-password").select("-__v");
    return users;
  }

  async getUser(id: string): Promise<User> {
    const found = await this.userDBModel.findById(id);
    const user: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      isAdmin: found.isAdmin,
    };
    return user;
  }

  async loginUser(email: string): Promise<UserData> {
    const userData: UserData = await this.userDBModel.findOne({ email: email });
    return userData;
  }

  async addAUser(newUser: NewUserDTO): Promise<User> {
    const createdUser = new this.userDBModel(newUser);
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
    const deleted = await this.userDBModel.findByIdAndDelete(id);
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
