/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/user/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>, // @InjectRepository(ProductType) // productTypeRepository: Repository<ProductType>, // @InjectRepository(Category) categoryRepository: Repository<Category>, // @InjectRepository(Provider) providerRepository: Repository<Provider>,
  ) {}

  async GetMessageByUserId(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Chat[]> {
    return this.chatRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: [{ userReceive: userId }, { userSend: userId }],
      order: { time: 'DESC' },
    });
  }

  async createChatMessage(chat) {
    return this.chatRepository.save(chat);
  }

  async getLastMessage(userId: string): Promise<Chat> {
    const messages = await this.chatRepository.find({
      take: 10,
      where: [{ userReceive: userId }, { userSend: userId }],
      order: { time: 'DESC' },
    });

    if (messages.length > 0) {
      return messages[0]; // Return the first (latest) message
    } else {
      return null; // Return null if no messages found
    }
  }
}
