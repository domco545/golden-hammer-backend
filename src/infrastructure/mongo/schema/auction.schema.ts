import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BidSchema } from './bid.schema';

export const AuctionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    startPrice: {type: Number, required: true},
    currentPrice: {type: Number, required: true},
    endDate: {type: Date, required: true},
    bids: [BidSchema],
    ownedBy: {type: Schema.Types.ObjectId, ref: 'UserEntity' },
});
AuctionSchema.set('toJSON', {
    virtuals: true
});