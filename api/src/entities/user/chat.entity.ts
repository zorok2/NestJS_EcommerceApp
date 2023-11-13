/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Timestamp,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.chatSend)
  userSend: User;

  @ManyToOne(() => User, (user) => user.chatReceive)
  userReceive: User;

  @Column()
  message: string;

  @Column()
  time: Date;
}
