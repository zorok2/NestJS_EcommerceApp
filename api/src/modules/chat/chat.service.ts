/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { ChatRepository } from './chat.repository';
import { Chat } from 'src/entities/user/chat.entity';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getMessage(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<ResponseBase> {
    try {
      const message = await this.chatRepository.GetMessageByUserId(
        userId,
        page,
        pageSize,
      );
      if (!message) {
        return this.createResponseBase(ResponseStatus.Failure, 'Chat is empty');
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Chat Message received successfully',
        message,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async createChatMessage(chatMessage: Chat): Promise<ResponseBase> {
    try {
      const message = await this.chatRepository.createChatMessage(chatMessage);
      if (!message) {
        return this.createResponseBase(ResponseStatus.Failure, 'Chat is empty');
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Chat Message create successfully',
        message,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
