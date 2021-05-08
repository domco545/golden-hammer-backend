import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuctionEntity } from '../entity/auction.entity';
import { Auction } from '../../../core/models/auction.model';

@Injectable()
export class AuctionRepository {
  constructor(
    @Inject('AUCTION_MODEL')
    private auctionDBModel: Model<AuctionEntity>,
  ) {
  }

  async getAllAuctions(): Promise<Auction[]> {
    const auctions: Auction[] = await this.auctionDBModel.find();
    return auctions;
  }

  async getAuction(id: string): Promise<Auction> {
    const auction: Auction = await this.auctionDBModel.findById(id);
    return auction;
  }

  async addAuction(auction: Auction): Promise<Auction> {
    const createdAuction = new this.auctionDBModel(auction);
    const auctionEntitySaved = await createdAuction.save();
    const actionToReturn: Auction = {
      id: auctionEntitySaved._id,
      name: auctionEntitySaved.name,
      description: auctionEntitySaved.description,
      startPrice: auctionEntitySaved.startPrice,
      currentPrice: auctionEntitySaved.currentPrice,
      bids: auctionEntitySaved.bids,
      ownedBy: auctionEntitySaved.ownedBy,
    };
    console.log('entiy saved', actionToReturn);
    return actionToReturn;
  }

  async deleteAuction(id: string): Promise<Auction> {
    const deleted = await this.auctionDBModel.findByIdAndRemove(id);
    return deleted;
  }

  async updateAuction(auction: Auction): Promise<Auction> {
    const update = {
      name: auction.name,
      description: auction.description,
      startPrice: auction.startPrice,
      currentPrice: auction.currentPrice,
      bids: auction.bids,
      ownedBy: auction.ownedBy,
    };
    const updatedAuction = await this.auctionDBModel.findByIdAndUpdate(
      auction.id,
      update,
      { new: true },
    );
    return updatedAuction;
  }
}
