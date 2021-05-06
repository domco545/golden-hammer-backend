import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BidModule } from './api/real-time/bid.module';
import { AuctionModule } from './api/rest/auction.module';

@Module({
  imports: [
    BidModule,
    AuctionModule,
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
