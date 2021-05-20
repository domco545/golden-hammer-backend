import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const BidSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    date: {type: Date, required: true, default: Date.now},
    bidder: {type: Schema.Types.ObjectId, ref: 'UserEntity' },
});
BidSchema.set('toJSON', {
    virtuals: true
});