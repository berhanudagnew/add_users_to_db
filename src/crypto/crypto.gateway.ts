import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CryptoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clients: any[] = [];

  handleConnection(client: any) {
    this.clients.push(client);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.clients = this.clients.filter((c) => c !== client);
    console.log(`Client disconnected: ${client.id}`);
  }

  sendPriceUpdate(price: string) {
    this.clients.forEach((client) => {
      client.emit('priceUpdate', price);
    });
  }
}
