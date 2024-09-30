

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable({
  providedIn: 'root',
})


export class CustomersService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.adminUrl}/customers`;


    getCustomersPage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            withCredentials: true,
        });
    }

    blockCustomer(id: string){
        return this.http.get<any>(`${this.APIBASE_URL}/block/${id}`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            withCredentials: true,
        })
    }

    unblockCustomer(id: string){
      return this.http.get<any>(`${this.APIBASE_URL}/unblock/${id}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          withCredentials: true,
      })
  }
}
