

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root',
})


export class VendorsService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = 'http://localhost:2000/admin/vendors'


    getVendorsPage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            withCredentials: true,
        });
    }

    blockVendor(id: string){
        return this.http.get<any>(`${this.APIBASE_URL}/block/${id}`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            withCredentials: true,
        })
    }

    unblockVendor(id: string){
      return this.http.get<any>(`${this.APIBASE_URL}/unblock/${id}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          withCredentials: true,
      })
  }
}
