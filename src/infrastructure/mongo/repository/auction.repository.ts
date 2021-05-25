import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuctionEntity } from '../entity/auction.entity';
import { Auction } from '../../../core/models/auction.model';
import { Bid } from 'src/core/models/bid.model';
import { NewAuctionDTO } from 'src/api/rest/dtos/newAuction.dto';
import { AddBidDTO } from 'src/api/real-time/dtos/add-bid.dto';
import { ListenForBidsDto } from 'src/api/real-time/dtos/listenForBids.dto';

@Injectable()
export class AuctionRepository {
  constructor(
    @Inject('AUCTION_MODEL')
    private auctionDBModel: Model<AuctionEntity>,
  ) {}

  async getAllAuctions(): Promise<Auction[]> {
    const auctions: Auction[] = await this.auctionDBModel
      .find()
      .populate('ownedBy', '-password')
      .populate('bids.bidder', '-password');
    return auctions;
  }

  async getAuction(id: string): Promise<Auction> {
    const auction: Auction = await this.auctionDBModel
      .findById(id)
      .populate('ownedBy')
      .populate('bids.bidder', '-password');
    return auction;
  }

  async addAuction(auction: NewAuctionDTO): Promise<Auction> {
    const createdAuction = new this.auctionDBModel({
      name: auction.name,
      description: auction.description,
      startPrice: auction.startPrice,
      currentPrice: auction.startPrice,
      endDate: auction.endDate,
      ownedBy: auction.ownedByID,
    });
    console.log(createdAuction);
    const auctionEntitySaved = await createdAuction.save();

    const actionToReturn: Auction = {
      id: auctionEntitySaved._id,
      name: auctionEntitySaved.name,
      description: auctionEntitySaved.description,
      startPrice: auctionEntitySaved.startPrice,
      currentPrice: auctionEntitySaved.currentPrice,
      endDate: auctionEntitySaved.endDate,
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

  async addBid(bid: AddBidDTO): Promise<ListenForBidsDto> {
    const updatedAuction = await this.auctionDBModel
      .findByIdAndUpdate(
        bid.auctionId,
        {
          $push: { bids: { value: bid.value, bidder: bid.bidderId } },
          $inc: { currentPrice: bid.value },
        },
        { new: true },
      )
      .populate('bids.bidder', '-password');
    const toReturn: ListenForBidsDto = {
      bids: updatedAuction.bids,
      currentItemPrice: updatedAuction.currentPrice,
    };
    return toReturn;
  }

  async getAllBidsForAuction(auctionId: string): Promise<ListenForBidsDto> {
    const auction: Auction = await this.auctionDBModel
      .findById(auctionId)
      .populate('bids.bidder', '-password');

    const toReturn: ListenForBidsDto = {
      bids: auction.bids,
      currentItemPrice: auction.currentPrice,
    };
    return toReturn;
  }
}
