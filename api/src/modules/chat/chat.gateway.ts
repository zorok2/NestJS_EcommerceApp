/* eslint-disable prettier/prettier */
import { ChatService } from 'src/modules/chat/chat.service';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from 'src/entities/user/chat.entity';
import { chatDto } from '../user/dto/request/user-login.dto';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(payload: chatDto): Promise<void> {
    //await this.chatService.createChatMessage(payload);
    this.server.emit('recMessage', payload);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }
}
