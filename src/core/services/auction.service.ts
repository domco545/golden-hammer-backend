import { Injectable } from '@nestjs/common';
import { NewAuctionDTO } from 'src/api/rest/dtos/newAuction.dto';
import { AuctionRepository } from '../../infrastructure/mongo/repository/auction.repository';
import { Auction } from '../models/auction.model';

@Injectable()
export class AuctionService {
  constructor(private auctionRepository: AuctionRepository) {}

  async createAuction(newAuction: NewAuctionDTO): Promise<Auction> {
    const auctionCreated = await this.auctionRepository.addAuction(newAuction);
    return auctionCreated;
  }

  async getAllAuctions(): Promise<Auction[]> {
    const auctions = await this.auctionRepository.getAllAuctions();
    return auctions;
  }

  async getAuction(id: string): Promise<Auction> {
    const auction = await this.auctionRepository.getAuction(id);
    return auction;
  }

  async updateAuction(auction: Auction): Promise<Auction> {
    const updatedAuction = await this.auctionRepository.updateAuction(auction);
    return updatedAuction;
  }

  async deleteAuction(id: string): Promise<Auction> {
    const deleted = await this.auctionRepository.deleteAuction(id);
    return deleted;
  }
}
