/* eslint-disable prettier/prettier */
import { Body, Get, Post, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { Chat } from 'src/entities/user/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChatMessages(
    @Query('userId') userId: string,
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
  ) {
    const message = this.chatService.getMessage(userId, page, pageSize);
    return message;
  }

  @Post()
  async createChatMessage(@Body() chatMessage: Chat) {
    return await this.chatService.createChatMessage(chatMessage);
  }
}
