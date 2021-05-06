import * as mongoose from 'mongoose';
import { BidSchema } from './bid.schema';
import { UserSchema } from './user.schema';

export const AuctionSchema = new mongoose.Schema({
    name: String,
    description: String,
    startPrice: Number,
    currentPrice: Number,
    bids: [BidSchema],
    ownedBy: UserSchema,
});
AuctionSchema.set('toJSON', {
    virtuals: true
});