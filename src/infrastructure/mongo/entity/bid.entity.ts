import { Document } from 'mongoose';
import { User } from 'src/core/models/user.model';

export interface UserEntity extends Document {
    readonly _id: string;
    readonly value: number;
    readonly date: string;
    readonly bidder: User;
  }