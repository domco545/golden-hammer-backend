import { Module } from '@nestjs/common';
import { AuctionController } from './auction/auction.controller';
import { AuctionController } from './auction.controller';
import { AuctionService } from '../core/services/auction.service';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
