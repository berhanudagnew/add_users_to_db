import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { CryptoGateway } from './crypto/crypto.gateway';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, CryptoGateway, CryptoService],
})
export class AppModule {}
