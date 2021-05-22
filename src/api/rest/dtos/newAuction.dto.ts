export interface NewAuctionDTO {
  name: string;
  description: string;
  startPrice: number;
  endDate: Date;
  ownedByID: string;
}
