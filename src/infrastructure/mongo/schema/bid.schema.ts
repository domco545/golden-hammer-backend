import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';

export const BidSchema = new mongoose.Schema({
    value: Number,
    date: String,
    bidder: UserSchema,
});
BidSchema.set('toJSON', {
    virtuals: true
});