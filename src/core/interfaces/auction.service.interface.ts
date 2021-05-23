import { Auction } from '../models/auction.model';

export const IAuctionServiceProvider = 'IAuctionServiceProvider';

export interface IAuctionService {

  getAuction(id: string): Promise<Auction>;

  getAllAuctions(): Promise<Auction[]>;

  createAuction(auction: Auction): Promise<Auction>;

  deleteAuction(id: string): Promise<Auction>;

  updateAuction(auction: Auction): Promise<Auction>;
}
