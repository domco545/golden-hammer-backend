import { Test, TestingModule } from '@nestjs/testing';
import { AuctionService } from './auction.service';
import { AuctionRepository } from '../../infrastructure/mongo/repository/auction.repository';

describe('AuctionService', () => {
  let service: AuctionService;
  const mockRepo = {
    createAuction: jest.fn().mockImplementation((dto) => dto),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionService, AuctionRepository],
    })
      .overrideProvider(AuctionRepository)
      .useValue(mockRepo)
      .compile();

    service = module.get<AuctionService>(AuctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new auction and return it', async () => {
    expect(
      await service.createAuction({
        name: 'Car',
        description: 'Good car',
        startPrice: 10000,
        endDate: Date.prototype,
        ownedByID: '1',
      }),
    ).toEqual({
      name: 'Car',
      description: 'Good car',
      startPrice: 10000,
      endDate: Date.prototype,
      ownedByID: '1',
    });
  });
});
