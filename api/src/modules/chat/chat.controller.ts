/* eslint-disable prettier/prettier */
import { Body, Get, Param, Post, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Chat } from 'src/entities/user/chat.entity';
import { chatDto, getChatDto } from '../user/dto/request/user-login.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/message')
  async getChatMessages(@Body() getChatDto: getChatDto) {
    const message = this.chatService.getMessage(
      getChatDto.username,
      getChatDto.page,
      getChatDto.pageSize,
    );
    return message;
  }

  @Get('/list')
  async getList(@Body() getChatDto: getChatDto) {
    return this.chatService.getListAccountMessage(getChatDto.username);
  }

  @Post()
  async createChatMessage(@Body() chatDto: chatDto) {
    return await this.chatService.createChatMessage(chatDto);
  }
}
