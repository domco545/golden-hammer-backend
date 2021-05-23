import { Module } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/mongo/mongo.module';
import { auctionsProviders } from 'src/infrastructure/mongo/providers/auction.providers';
import { AuctionRepository } from 'src/infrastructure/mongo/repository/auction.repository';
import { AuctionService } from '../../core/services/auction.service';
import { AuctionController } from './auction.controller';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService, AuctionRepository, ...auctionsProviders],
  imports: [MongoModule]
})
export class AuctionModule {}
