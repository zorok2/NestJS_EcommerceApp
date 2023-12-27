/* eslint-disable prettier/prettier */
import { use } from 'passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/user/chat.entity';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>, // @InjectRepository(ProductType) // productTypeRepository: Repository<ProductType>, // @InjectRepository(Category) categoryRepository: Repository<Category>, // @InjectRepository(Provider) providerRepository: Repository<Provider>,
  ) {}

  async getMessageByUsername(
    username: string,
    page: number,
    pageSize: number,
  ): Promise<Chat[]> {
    return this.chatRepository.find({
      //skip: (page - 1) * pageSize,
      take: pageSize,
      select: ['id', 'userReceive', 'userSend', 'message', 'time'],
      where: [
        { userReceive: { username: username } },
        { userSend: { username: username } },
      ],

      order: { time: 'ASC' },
      relations: { userReceive: true, userSend: true },
    });
  }

  async createChatMessage(chat) {
    return this.chatRepository.save(chat);
  }

  async getLastMessage(user: User): Promise<Chat> {
    const messages = await this.chatRepository.find({
      take: 10,
      where: {
        userReceive: {
          id: user.id,
        },
        userSend: {
          id: user.id,
        },
      },
      order: { time: 'DESC' },
    });

    if (messages.length > 0) {
      return messages[0]; // Return the first (latest) message
    } else {
      return null; // Return null if no messages found
    }
  }

  async getListAccountMessage(username: string) {
    const list = this.chatRepository.find({
      select: ['id', 'userReceive', 'userSend', 'message', 'time'],
      where: [
        { userReceive: { username: username } },
        { userSend: { username: username } },
      ],
      order: { time: 'DESC' },
      relations: { userReceive: true, userSend: true },
    });
    const uniqueUsers = new Set<User>();
    console.log('oke');
    for (let index = 0; index < (await list).length; index++) {
      const chat = list[index];
      uniqueUsers.add(chat.userReceive);
      uniqueUsers.add(chat.userSend);
    }

    const userList = Array.from(uniqueUsers);
    return userList;
  }
}
