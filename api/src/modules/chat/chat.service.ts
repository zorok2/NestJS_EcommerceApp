/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { ChatRepository } from './chat.repository';
import { Chat } from 'src/entities/user/chat.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { chatDto } from '../user/dto/request/user-login.dto';
import { Timestamp } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}
  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getMessage(
    username: string,
    page: number,
    pageSize: number,
  ): Promise<ResponseBase> {
    try {
      const message = await this.chatRepository.getMessageByUsername(
        username,
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

  async createChatMessage(chatDto: chatDto): Promise<ResponseBase> {
    try {
      const chatToSave: Chat = new Chat();
      chatToSave.message = chatDto.message;
      chatToSave.userReceive = await this.userRepository.findByUserNameChat(
        chatDto.userReceive,
      );
      chatToSave.userSend = await this.userRepository.findByUserNameChat(
        chatDto.userSend,
      );
      chatToSave.time = new Date();
      const message = await this.chatRepository.createChatMessage(chatToSave);
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

  async getListAccountMessage(username: string): Promise<ResponseBase> {
    try {
      const result = await this.chatRepository.getMessageByUsername(
        username,
        2,
        10,
      );
      if (!result) {
        return this.createResponseBase(ResponseStatus.Failure, 'Chat is empty');
      }
      const uniqueUsers = new Array<User>();
      console.log('oke');
      for (let index = 0; index < result.length; index++) {
        const chat = result[index];
        if (chat.userReceive.username != username) {
          uniqueUsers.push(chat.userReceive);
        }
        if (chat.userSend.username != username) {
          uniqueUsers.push(chat.userSend);
        }
      }
      console.log(uniqueUsers.length);
      const temp = this.filteredChats(result);
      const finalResult = Array<User>();
      for (let index = 0; index < temp.length; index++) {
        if (temp[index].userReceive.username != username) {
          finalResult.push(temp[index].userReceive);
        }
        if (temp[index].userSend.username != username) {
          finalResult.push(temp[index].userSend);
        }
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get List Account Message successfully',
        finalResult,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
  filteredChats(chats: Chat[]): Chat[] {
    const userPairs: string[] = [];
    return chats
      .filter((chat) => {
        // Sort IDs and join into string
        const ids = [chat.userSend.id, chat.userReceive.id].sort();
        const pairKey = ids.join('-');

        if (!userPairs.includes(pairKey)) {
          userPairs.push(pairKey);
          return true;
        }

        return false;
      })
      .filter((chat) => {
        // Only keep chats where receiver is not user1
        if (chat.userSend.id !== 'admin') {
          return true;
        }

        return false;
      });
  }
}
