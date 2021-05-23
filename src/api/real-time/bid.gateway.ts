import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Bid } from 'src/core/models/bid.model';
import { BidService } from 'src/core/services/bid.service';
import { AddBidDTO } from './dtos/add-bid.dto';

@WebSocketGateway()
export class BidGateway {
  constructor(private bidService: BidService) { }
  @WebSocketServer() server;

  @SubscribeMessage('switch-channel')
  async handleChannelChange(
    @MessageBody() channelID: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      client.leaveAll();
      client.join(channelID);
      const auctionBids: Bid[] = await this.bidService.getBidsForAuction(channelID);
      client.emit('listen-for-bids', auctionBids )
    } catch (e) {
      client.emit('error', e.message);
    }
  }
  @SubscribeMessage('add-bid')
  async handleAddBid(
    @MessageBody() bid: AddBidDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const bidsFromDb: Bid[] = await this.bidService.addBid(bid);
      this.server.to(bid.auctionId).emit('listen-for-bids', bidsFromDb);
    } catch (e) {
      client.emit('error', e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connect', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnect', client.id);
  }
}
