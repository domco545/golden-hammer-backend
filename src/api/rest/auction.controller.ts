import { BadRequestException, Controller, Get, Inject, InternalServerErrorException, Param } from '@nestjs/common';
import { Auction } from '../../core/models/auction.model';
import { AuctionService } from '../../core/services/auction.service';
import { IAuctionService, IAuctionServiceProvider } from '../../core/interfaces/auction.service.interface';
import { User } from '../../core/models/user.model';

@Controller('auction')
export class AuctionController {
  constructor(
    @Inject(IAuctionServiceProvider) private auctionService: IAuctionService,
  ) {
  }

  @Get()
  async findAll(): Promise<Auction[]> {
    try {
      return await this.auctionService.getAllAuctions();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAuction(@Param('id') id: string): Promise<Auction> {
    try {
      const auction: Auction = await this.auctionService.getAuction(id);
      if (auction) {
        return auction;
      }
      throw new BadRequestException('auction doesnt exist');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
