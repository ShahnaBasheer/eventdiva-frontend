

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})



export class AllBookingService {
  APIBASE_URL =  `${environment.baseUrl}/bookings`

  constructor(private http: HttpClient){}

  getAllBookings(){
      return this.http.get<any>(`${this.APIBASE_URL}`, {
        withCredentials: true,
      })
  }

}
