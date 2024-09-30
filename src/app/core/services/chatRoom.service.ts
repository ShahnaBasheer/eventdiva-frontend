import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Chatroom, Message } from '../models/chatroom.model';
import { SocketService } from './socket.service';


@Injectable({
  providedIn: 'root'
})


export class ChatRoomService {
  private socket!: Socket | null;
  private chatMessagesSubject = new BehaviorSubject<any[]>([]);
  private notifySubject = new BehaviorSubject<boolean>(false);
  private roomId = '';

  public chatMessages$ = this.chatMessagesSubject.asObservable();
  public notifyMessageSubject$ = this.notifySubject.asObservable();


  constructor(
    private http: HttpClient,
    private socketService: SocketService,
  ) {

    this.socket = this.socketService.getSocket();

    this.socket?.on('new-message', (data: { chat: any, userRole: string, message: string }) => {
      console.log(`Received message from ${data.userRole}:`);
      const messages = data.chat.messages;
      this.chatMessagesSubject.next([...this.chatMessagesSubject.getValue(), messages[messages.length - 1]]);
    });

    this.socket?.on('notify-message', data => {
        console.log("it is there")
        this.notifySubject.next(true);
    });

    this.socket?.on('user-joined', (data: {  receiverId: string, response: Chatroom }) => {
      console.log("user has joined the room", data.response._id, data.response.messages.length);
      this.roomId = data.response._id || '';
      this.chatMessagesSubject.next(data.response.messages);
    });

  }

  public joinChatRoom(receiverId: string){
    this.socketService.emit('join-chat-room', { receiverId });
  }


  public async sendMessage(message: string, name: string) {
    console.log("i am here in sending messages",message, name)
    await this.socketService.emit('send-message', { message, chatRoomId: this.roomId, name});
  }

  public async leaveChatRoom(userRole: string) {
    console.log(userRole, "leave room");
    this.chatMessagesSubject.next([]);
    await this.socketService.emit('leave-chat-room', { chatRoomId: this.roomId , userRole });
  }


  public updateChatMessages(value: Message[]){
    this.chatMessagesSubject.next(value);
  }

  public checkUnreadMessagesAPI(URL: string){
    return this.http.get<any>(`${URL}/unread-messages`, {
      withCredentials: true,
    });
  }

  public updateNotifyMessage(value: boolean){
    this.notifySubject.next(value);
  }

  public markMessageAsRead(messageId: string): Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/${this.roomId}/messages/${messageId}/read`, {});
  }

}

