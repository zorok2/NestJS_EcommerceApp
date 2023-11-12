/* eslint-disable prettier/prettier */
import { Timestamp } from 'typeorm';
export class UserLoginDto {
  username: string;
  password: string;
}

export class addressDTO {
  address: string;
}

export class getDistance {
  origin: string;
  desti: string;
}

export class chatDto {
  userSend: string;
  userReceive: string;
  message: string;
}

export class getChatDto {
  username: string;
  page: number;
  pageSize: number;
}
