/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FirebaseService } from './shared/file-upload/firebase/firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebSocketServer } from '@nestjs/websockets';

@Controller()
export class AppController {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  // @WebSocketServer()
  // private readonly server: Server;

  @Get()
  getPing(): string {
    return `connectinng: ${process.env.PG_DATABASE}`;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    console.log(await this.firebaseService.uploadFile([file]));
    return this.firebaseService.uploadFile([file]);
  }
}
