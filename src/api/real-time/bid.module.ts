import { Module } from '@nestjs/common';
import { BidGateway } from './bid.gateway';
import { BidService } from '../../core/services/bid.service';
import { MongoModule } from 'src/infrastructure/mongo/mongo.module';
import { AuctionRepository } from 'src/infrastructure/mongo/repository/auction.repository';
import { auctionsProviders } from 'src/infrastructure/mongo/providers/auction.providers';

@Module({
  providers: [BidGateway, BidService, AuctionRepository, ...auctionsProviders],
  imports: [MongoModule]
})
export class BidModule {}
