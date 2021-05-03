import { Module } from '@nestjs/common';
import { BidModule } from './api/real-time/bid.module';
import { AuctionModule } from './api/rest/auction.module';

@Module({
  imports: [BidModule, AuctionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
