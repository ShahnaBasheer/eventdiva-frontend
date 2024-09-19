import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class VideoCallService {

  private apiUrl = `${environment.baseUrl}`; // Adjust the URL based on your backend

  constructor(private http: HttpClient) {}

  startCall(vendorId: string): Observable<any> {
    return this.http.post<{ roomId: string }>(`${this.apiUrl}/video-call/start-call`, { vendorId }, {
      withCredentials: true,
    }
  )}



  joinCall(roomId: string): Observable<any> {
    return this.http.post<boolean>(`${this.apiUrl}/vendor/video-call/join-call`, { roomId }, {
      withCredentials: true,
    }
  )}
}
