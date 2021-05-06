import { Connection } from 'mongoose';
import { UserSchema } from '../schema/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserEntity', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];