import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    isAdmin: { type: Boolean, required: true, default: false },
});
UserSchema.set('toJSON', {
    virtuals: true
});