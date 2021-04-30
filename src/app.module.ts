import { Module } from '@nestjs/common';
import { BidModule } from './bid/api/bid.module';
import { AuctionModule } from './auction/api/auction.module';

@Module({
  imports: [BidModule, AuctionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
