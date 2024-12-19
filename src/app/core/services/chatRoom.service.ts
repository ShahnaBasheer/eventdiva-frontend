import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
        this.notifySubject.next(true);
    });

  }
  public async joinChatRoom(receiverId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.connected) {
        this.socketService.emit('join-chat-room', { receiverId });

        this.socket?.off('user-joined');

        this.socket?.on('user-joined', (data: { receiverId: string, res: Chatroom }) => {
          if (data && data.res && data.res._id) {
            console.log("User has joined the room");
            this.roomId = data.res._id || '';
            this.chatMessagesSubject.next(data.res.messages);
            resolve("success");
          } else {
            reject('Invalid chatroom data');
          }
        });

        // Adding a timeout in case the 'user-joined' event takes too long to be received
        setTimeout(() => {
          reject('User join timeout');
        }, 5000); // Timeout in 5 seconds
      } else {
        reject('Socket not connected');
      }
    });
  }



  public leaveChatRoom(userRole: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.connected) {
        this.socket?.off('user-left'); // Remove old listener

        // Emit the 'leave-chat-room' event to notify the server
        this.socketService.emit('leave-chat-room', { chatRoomId: this.roomId, userRole });

        // Listen for the 'user-left' event to confirm that the user has left the chatroom
        this.socket?.on('user-left', (data: { roomId: string, role: string }) => {
          if (data.roomId === this.roomId) {
            this.chatMessagesSubject.next([]); // Clear chat messages on leave
            this.roomId = ''; // Reset room ID
            console.log(data.role, 'left chatroom');
            resolve('success');
          } else {
            reject('Room ID mismatch');
          }
        });

        // Adding a timeout in case the 'user-left' event takes too long
        setTimeout(() => {
          reject('Leave chatroom timeout');
        }, 5000); // Timeout in 5 seconds
      } else {
        reject('Socket not connected');
      }
    });
  }





  public async sendMessage(message: string, name: string) {
    console.log("i am here in sending messages", message, name, this.roomId)
    this.socketService.emit('send-message', { message, chatRoomId: this.roomId, name});
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

  public markMessageAsRead(messageIds: string[], URL: string): Observable<any> {
    return this.http.patch<any>(`${URL}/message/read`,
       { messageIds , roomId: this.roomId },
       { withCredentials: true }
    )
  }

  public checkRoomId(){
    return !!this.roomId;
  }
}


