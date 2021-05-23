import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller';
import { AuctionService } from '../../core/services/auction.service';
import { NewAuctionDTO } from './dtos/newAuction.dto';

describe('AuctionController', () => {
  let controller: AuctionController;
  const mockAuctionService = {
    createAuction: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController],
      providers: [AuctionService],
    })
      .overrideProvider(AuctionService)
      .useValue(mockAuctionService)
      .compile();

    controller = module.get<AuctionController>(AuctionController);
  });

  it('should create a auction', () => {
    const newauction: NewAuctionDTO = {
      name: 'Audi',
      description: 'Casd',
      startPrice: 20000,
      endDate: Date.prototype,
      ownedByID: 'Carl',
    };
    expect(controller.createAuction(newauction)).toEqual(newauction);
    expect(mockAuctionService.createAuction).toHaveBeenCalledWith(newauction);
  });
});
