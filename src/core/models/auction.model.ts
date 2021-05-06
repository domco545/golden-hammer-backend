import { Bid } from "./bid.model";
import { User } from "./user.model";

export interface Auction{
    id: string;
    name: string;
    description: string;
    startPrice: number;
    currentPrice: number;
    bids: Bid[];
    ownedBy: User;
}