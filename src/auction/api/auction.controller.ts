import { Controller, Get } from '@nestjs/common';

@Controller('auction')
export class AuctionController {
    @Get()
    findAll(): string {
      return 'This action returns all auctions';
    }
}
