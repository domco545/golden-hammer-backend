import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoModule } from 'src/infrastructure/mongo/mongo.module';
import { AppModule } from './../src/app.module';
import { AuctionModule } from '../src/api/rest/auction.module';
import { AuctionService } from '../src/core/services/auction.service';
import { AuctionRepository } from '../src/infrastructure/mongo/repository/auction.repository';
import { Bid } from '../src/core/models/bid.model';
import { User } from '../src/core/models/user.model';

describe('AuctionController (e2e)', () => {
  let app: INestApplication;
  const mockAuctions = [
    {
      id: 1,
      name: 'Car',
      description: 'string',
    },
  ];
  const mockAuctionRepository = {
    findAll: jest.fn().mockResolvedValue(mockAuctions),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuctionModule],
    })
      .overrideProvider(AuctionRepository)
      .useValue(mockAuctionRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auction (GET)', () => {
    return request(app.getHttpServer())
      .get('/auction')
      .expect(200)
      .expect(mockAuctions);
  });
});
