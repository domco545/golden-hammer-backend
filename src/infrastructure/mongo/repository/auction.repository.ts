import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuctionEntity } from '../entity/auction.entity';

@Injectable()
export class AuctionRepository {
  constructor(
    @Inject('AUCTION_MODEL')
    private auctionDBModel: Model<AuctionEntity>,
  ) {}

}