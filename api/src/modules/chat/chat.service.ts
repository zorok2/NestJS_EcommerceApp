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
      const users = new Array<User>();
      for (let index = 0; index < uniqueUsers.length; index++) {
        const user1 = uniqueUsers[index];
        let flag = 0;
        if (users.length != 0) {
          for (let index1 = 0; index1 < users.length; index1++) {
            const user2 = users[index1];
            if (user1.id != user2.id) {
              flag = 1;
            } else flag = 0;
          }
          if (flag == 1) {
            users.push(user1);
          }
        } else users.push(user1);
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get List Account Message successfully',
        users,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
