import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('messageAppointmentCreate')
  handleMessage(@MessageBody() message: Object): void {
    this.server.emit('messageAppointmentCreate', message);
  }

  @SubscribeMessage('messageAppointmentUpdate')
  handleMessageUpdate(@MessageBody() message: Object): void {
    this.server.emit('messageAppointmentUpdate', message);
  }

}
