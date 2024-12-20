

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable({
  providedIn: 'root',
})


export class VendorsService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.adminUrl}/vendors`


    getVendorsPage(page: number, limit: number): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            params: {
              page: page.toString(), limit: limit.toString()
            },
            withCredentials: true,
        });
    }

    blockVendor(id: string){
        return this.http.get<any>(`${this.APIBASE_URL}/block/${id}/${environment.vendor}`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            withCredentials: true,
        })
    }

    unblockVendor(id: string){
      return this.http.get<any>(`${this.APIBASE_URL}/unblock/${id}/${environment.vendor}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          withCredentials: true,
      })
  }
}
