import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller';
import { AuctionService } from '../../core/services/auction.service';
import { NewAuctionDTO } from './dtos/newAuction.dto';


describe('AuctionController', () => {
  let controller: AuctionController;
  let service: AuctionService;

  const mockAuctionService = () => ({
    createAuction: jest.fn((dto) => ({...dto})),
  });


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
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a auction', () => {
    const newauction: NewAuctionDTO = {
      name: 'Audi',
      description: 'Car',
      startPrice: 20000,
      endDate: Date.prototype,
      ownedByID: '085dfg445hdzsdt00sergj',
    };
    expect(controller.createAuction(newauction)).toBeTruthy();
  });

});