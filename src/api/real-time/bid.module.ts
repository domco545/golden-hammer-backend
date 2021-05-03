import { Module } from '@nestjs/common';
import { BidGateway } from './bid.gateway';
import { BidService } from '../../core/services/bid.service';

@Module({
  providers: [BidGateway, BidService]
})
export class BidModule {}
