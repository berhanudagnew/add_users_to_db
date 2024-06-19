import { Injectable, OnModuleInit } from '@nestjs/common';
import { CryptoGateway } from './crypto.gateway';
import * as WebSocket from 'ws'; // Note the change here

@Injectable()
export class CryptoService implements OnModuleInit {
  private ws: WebSocket;

  constructor(private readonly cryptoGateway: CryptoGateway) {}

  onModuleInit() {
    this.connectToBinance();
  }

  private connectToBinance() {
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    this.ws.on('message', (data: string) => {
      const parsedData = JSON.parse(data);
      const price = parseFloat(parsedData.p).toFixed(4);
      this.cryptoGateway.sendPriceUpdate(price);
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.reconnectToBinance();
    });

    this.ws.on('close', () => {
      console.log('WebSocket connection closed. Reconnecting...');
      this.reconnectToBinance();
    });
  }

  private reconnectToBinance() {
    setTimeout(() => this.connectToBinance(), 5000);
  }
}
