import { Connection } from 'mongoose';
import { AuctionSchema } from '../schema/auction.schema';

export const auctionsProviders = [
  {
    provide: 'AUCTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('AuctionEntity', AuctionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];