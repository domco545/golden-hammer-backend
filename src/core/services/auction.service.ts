import { Injectable } from '@nestjs/common';
import { AuctionRepository } from '../../infrastructure/mongo/repository/auction.repository';
import { Auction } from '../models/auction.model';

@Injectable()
export class AuctionService {
  constructor(private auctionRepository: AuctionRepository) {
  }

  async createAuction(auction: Auction): Promise<Auction> {
    const auctionCreated = await this.auctionRepository.addAuction(auction);
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
