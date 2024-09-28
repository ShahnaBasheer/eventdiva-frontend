
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketService } from './socket.service';
import { Store } from '@ngrx/store';
import { getUserId as isCustomer } from '../../features/customer/store/customer.selectors';
import { getUserId as isVendor} from '../../features/vendors/store/vendor.selectors';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})


export class NotificationService {
  private socket!: Socket | null;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private userId = '';

  public notifications$ = this.notificationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private store: Store
  ) {

    this.store.select(isCustomer).subscribe(id => {
      if (id) {
        this.initializeSocketConnection(environment.customer, id);
        this.userId = id;
      }
    });

    this.store.select(isVendor).subscribe(id => {
      if (id) {
        this.initializeSocketConnection(environment.vendor, id);
        this.userId = id;
      }
    });

  }

  private initializeSocketConnection(role: string, id: string) {
    if (!this.socket) {
      this.socket = this.socketService.getSocket();
      this.initializeSocketListeners(role, id);
    }
  }



  private initializeSocketListeners(role: string, id: string) {
    this.socket?.on('loaded-notification', (data: { notification: Notification;  }) => {
      const currentNotifications = this.notificationsSubject.getValue();
      console.log(data.notification, "NOtification Arrived Here")
      this.notificationsSubject.next([data.notification, ...currentNotifications]);
    });

    // this.socket?.on('video-call-invitation', (data: { callerId: string, roomId: string }) => {
    //   const videoCallNotification = {
    //     type: 'video-call',
    //     message: `You have a video call invitation from ${data.callerId}`,
    //     roomId: data.roomId
    //   };
    //   const currentNotifications = this.notificationsSubject.getValue();
    //   this.notificationsSubject.next([...currentNotifications, videoCallNotification]);
    // });
  }



  public fetchNotifications(url: string = ''): Observable<any> {
    return this.http.get(`${environment.baseUrl}${url}/notifications`, {
        withCredentials: true
    });
  }

  // Emit notification event to server
  emitNotification(data: { message: string, userId: string, role: string, type: string }): void {
    this.socketService.emit('save-notifications', {
        message:  data.message, userId: data.userId, role: data.role , type: data.type
    });
  }

  public getUserId(){
    return this.userId;
  }

  public addNotifications(data: Notification[]){
    return this.notificationsSubject.next(data);
  }

  public onIsReadChange(id: string, url: string = ''){
      return this.http.patch(`${environment.baseUrl}${url}/notifications/read`, { id  }, {
        withCredentials: true
      });
  }

  public ondeleteNotification(id: string, url: string = ''){
    return this.http.delete(`${environment.baseUrl}${url}/notifications/delete/${id}`, {
      withCredentials: true
    });
  }


  public emitNewNotification(event: string, data: any) {
    this.socket?.emit('save-notification', data);
  }
}
