/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import {
  ChangePermissionDto,
  UpdateUserDto,
} from '../dto/request/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UserRepository.name);
  //TODO Query
  //Find All Users
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'fullname', 'email', 'username', 'phone', 'avatarUrl'],
      relations: { addresses: true, permission: true },
    });
  }

  //Find User By Id
  async findById(id: string): Promise<User> {
    const options: FindOneOptions<User> = {
      //select: ['id', 'fullname', 'email', 'username', 'phone', 'avatarUrl'],
      where: {
        id: id,
      },
      relations: { addresses: true, permission: true },
    };
    return this.userRepository.findOne(options);
  }

  //Find Users By Name
  async findByName(name: string): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id', 'fullname', 'email', 'username', 'phone', 'avatarUrl'],
    });
    const result = (await users).filter((user) => user.username.includes(name));
    return result;
  }

  //Find User By Username
  async findByUserName(userName: string) {
    const options: FindOneOptions<User> = {
      select: ['id', 'fullname', 'email', 'username', 'phone', 'avatarUrl'],

      where: {
        username: userName,
      },
    };
    return this.userRepository.findOne(options);
  }

  async findByUserNameChat(userName: string) {
    const options: FindOneOptions<User> = {
      where: {
        username: userName,
      },
    };
    return this.userRepository.findOne(options);
  }

  //Login
  async login(userName: string): Promise<User> {
    const options: FindOneOptions<User> = {
      // select: ['id', 'fullname', 'email', 'username', 'phone', 'avatarUrl'],
      where: {
        username: userName,
      },
      relations: ['permission'],
    };
    return this.userRepository.findOne(options);
  }

  //TODO Command
  //Create User
  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  //Update User
  async updateUser(userUpdate: UpdateUserDto): Promise<User> {
    const option: FindOneOptions<User> = {
      where: {
        username: userUpdate.username,
      },
    };
    const user = await this.userRepository.findOne(option);
    const updatedUser = Object.assign(user, userUpdate);
    //this.logger.debug(userUpdate);
    //updatedUser.addresses = userUpdate.addresses;
    return this.userRepository.save(updatedUser);
  }

  async changePassword(userId: string, newPass: string): Promise<User> {
    const option: FindOneOptions<User> = {
      where: {
        id: userId,
      },
    };
    const user = await this.userRepository.findOne(option);
    user.password = newPass;
    return this.userRepository.save(user);
  }

  async updateAvt(userId: string, avt: string): Promise<User> {
    const user = await this.findById(userId);
    user.avatarUrl = avt;
    return this.userRepository.save(user);
  }

  async changPermission(userData: ChangePermissionDto): Promise<User> {
    const option: FindOneOptions<User> = {
      where: {
        id: userData.userId,
      },
    };
    const user = await this.userRepository.findOne(option);
    user.permission = userData.permission;
    return this.userRepository.save(user);
  }
}
