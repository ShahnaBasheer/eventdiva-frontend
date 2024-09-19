import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { getUserId as customer } from '../../features/customer/store/customer.selectors';
import { getUserId as vendor} from '../../features/vendors/store/vendor.selectors';
import { Store } from '@ngrx/store';
import { TokenService } from './jwtToken.service';
import { Router } from '@angular/router';
import { adminLogOut, adminSessionExpired } from '../../features/admin/store/admin.actions';
import { logOutSuccess, sessionExpired } from '../../features/customer/store/customer.actions';
import { vendorLogOut, vendorSessionExpired } from '../../features/vendors/store/vendor.actions';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})



export class SocketService {
  private socket!: Socket | null;
  private currentPath: string = ''; // Store the current path

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.router.events.subscribe(() => {
      this.currentPath = this.router.url; // Set the current URL path
    });

    this.store.select(customer).subscribe(id => {
      if(id){
        let accessToken = this.tokenService.getToken(environment.cu_accessKey) ?? '';
        this.setupSocketConnection("customer", id, accessToken);
      }
    })

    this.store.select(vendor).subscribe(id => {
      if(id){
        let accessToken = this.tokenService.getToken(environment.vn_accessKey) ?? '';
        this.setupSocketConnection("vendor", id, accessToken);
      }
    })
  }


  private setupSocketConnection(role: string, id: string, token: string): void {
    this.socket = io(environment.baseUrl, {
      auth: { token },
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');

      if (role === 'customer') {
        this.socket?.emit('register-customer', { customerId: id });
      } else if (role === 'vendor') {
        this.socket?.emit('register-vendor', { vendorId: id });
      }

    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on("new-token", ({ token }) => {
      if(role === environment.customer) this.tokenService.setToken(environment.cu_accessKey, token);
      else if(role === environment.vendor) this.tokenService.setToken(environment.vn_accessKey, token);
      console.log("Token refreshed and saved", token);
    });
    console.log(this.currentPath, "jdjkckjkj");

    this.socket.on('error', (error) => {
      if(role === environment.admin){
        if( error.error.statusCode === 401){
          this.store.dispatch(adminSessionExpired());
        } else if( error.error.statusCode === 403){
          this.store.dispatch(adminLogOut());
        } else {
          this.toastr.error( error.error.messaage);
        }
      } else if(role === environment.customer){
        if(error.error.statusCode === 401){
          this.store.dispatch(sessionExpired());
        } else if(error.error.statusCode === 403){
          this.store.dispatch(logOutSuccess());
        } else {
          this.toastr.error(error.error.message);
        }
      } else if(role === environment.vendor){
        if(error.error.statusCode === 401){
          this.store.dispatch(vendorSessionExpired());
        } else if(error.error.statusCode === 403){
          this.store.dispatch(vendorLogOut());
        } else {
          this.toastr.error(error.error.message);
        }
      }
      console.log('Error happens:', error.error.statusCode);
    });
  }


  public emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  public ngOnDestroy(): void {
    this.disconnectSocket();
  }

  private disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('Socket disconnected');
    }
  }

  public getSocket(){
    return this.socket;
  }
}
