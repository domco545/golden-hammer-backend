import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BidModule } from './api/real-time/bid.module';
import { AuctionModule } from './api/rest/auction.module';
import { AuthModule } from './api/rest/auth.module';
import { UserModule } from './api/rest/user.module';

@Module({
  imports: [
    BidModule,
    AuctionModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_CONNECTION_STRING: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
