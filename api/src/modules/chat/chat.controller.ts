/* eslint-disable prettier/prettier */
import { getChatDto } from './../user/dto/request/user-login.dto';

import { Body, Get, Param, Post, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Chat } from 'src/entities/user/chat.entity';
import { chatDto } from '../user/dto/request/user-login.dto';
import { ChatService } from './chat.service';
import { Server, createServer } from 'http';
import { SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { ChatGateway } from './chat.gateway';
// import { WebSocketServer } from '@nestjs/websockets';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly server: Server,
  ) {}

  // @WebSocketServer()
  // private readonly server: Server;

  @Get('/message/:username')
  async getChatMessages(@Param('username') username: string) {
    const message = this.chatService.getMessage(username, 2, 20);
    console.log('Run api get list message');
    console.log(username);
    return message;
  }

  @Get('/list/:username')
  async getList(@Param('username') username: string) {
    console.log(username);
    return this.chatService.getListAccountMessage(username);
  }

  @Post()
  @SubscribeMessage('sendMessage')
  async createChatMessage(@Body() chatDto: chatDto) {
    const newChatMessage = await this.chatService.createChatMessage(chatDto);
    this.server.emit('recMessage', chatDto);
    console.log(this.server.address);
    return newChatMessage;
  }
}
