

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";


@Injectable()



export class CustomerService {

  APIBASE_URL = `${environment.customerUrl}`

  constructor(private http: HttpClient){}


  getAllBookings(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
      withCredentials: true,
    });
  }

  getContactPage(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/contact`, {
      withCredentials: true,
    });
  }

  getAboutPage(): Observable<any> {
    return this.http.get<any>(`${this.APIBASE_URL}/about`, {
      withCredentials: true,
    });
  }

}
