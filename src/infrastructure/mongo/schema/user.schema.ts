import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false },
});
UserSchema.set('toJSON', {
    virtuals: true
});