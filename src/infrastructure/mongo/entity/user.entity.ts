import { Document } from 'mongoose';

export interface UserEntity extends Document {
    readonly _id: string;
    readonly __v: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: boolean;
  }