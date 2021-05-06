import { User } from "./user.model";

export interface Bid{
    id: string;
    value: number;
    date: string;
    bidder: User;
}