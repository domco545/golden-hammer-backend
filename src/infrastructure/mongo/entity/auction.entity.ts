import { Document } from 'mongoose';
import { Bid } from 'src/core/models/bid.model';
import { User } from 'src/core/models/user.model';

export interface AuctionEntity extends Document {
    readonly _id: string;
    readonly __v: number;
    readonly name: string;
    readonly description: string;
    readonly startPrice: number;
    readonly currentPrice: number;
    readonly endDate: Date;
    readonly bids: Bid[];
    readonly ownedBy: User;
  }