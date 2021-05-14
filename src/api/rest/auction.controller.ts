import { Controller, Get, Inject } from '@nestjs/common';
import { Auction } from '../../core/models/auction.model';
import { AuctionService } from '../../core/services/auction.service';
import { IAuctionService, IAuctionServiceProvider } from '../../core/interfaces/auction.service.interface';

@Controller('auction')
export class AuctionController {
  constructor(
    @Inject(IAuctionServiceProvider) private auctionService: IAuctionService,
  ) {
  }

  @Get()
  findAll(): Promise<Auction[]> {
    return this.auctionService.getAllAuctions();
    //returns all auctions
  }

  @Get()
  findAuction(id: string): Promise<Auction> {
    return this.auctionService.getAuction(id);
    //returns one auction
  }
}
