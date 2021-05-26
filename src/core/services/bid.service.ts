import { Injectable } from '@nestjs/common';
import { AddBidDTO } from 'src/api/real-time/dtos/add-bid.dto';
import { ListenForBidsDto } from 'src/api/real-time/dtos/listenForBids.dto';
import { AuctionRepository } from 'src/infrastructure/mongo/repository/auction.repository';
import { Bid } from '../models/bid.model';

@Injectable()
export class BidService {
  constructor(private auctionRepository: AuctionRepository) {}

  async getBidsForAuction(auctionId: string): Promise<ListenForBidsDto> {
    return this.auctionRepository.getAllBidsForAuction(auctionId);
  }

  async addBid(bid: AddBidDTO): Promise<ListenForBidsDto>{
    return this.auctionRepository.addBid(bid);
  }
}
