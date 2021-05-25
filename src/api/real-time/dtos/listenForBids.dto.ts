import { Bid } from "src/core/models/bid.model";

export interface ListenForBidsDto {
    bids: Bid[];
    currentItemPrice: number;
}