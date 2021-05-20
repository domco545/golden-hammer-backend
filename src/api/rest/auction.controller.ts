import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auction } from '../../core/models/auction.model';
import { AuctionService } from '../../core/services/auction.service';
import {
  IAuctionService,
  IAuctionServiceProvider,
} from '../../core/interfaces/auction.service.interface';
import { NewAuctionDTO } from './dtos/newAuction.dto';

@Controller('auction')
export class AuctionController {
  constructor(private auctionService:AuctionService) {}

  @Get()
  async findAll(): Promise<Auction[]> {
    try {
      return await this.auctionService.getAllAuctions();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
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

  @Post()
  async createAuction(@Body() newAuction: NewAuctionDTO): Promise<Auction> {
    try {
      const auction = await this.auctionService.createAuction(newAuction);
      if (auction) {
        return auction;
      }
      throw new BadRequestException('cannot create auction');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async deleteAuction(@Param('id') id: string): Promise<Auction>{
      try {
        const auction = await this.auctionService.deleteAuction(id);
        if (auction) {
          return auction;
        }
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  }
}
