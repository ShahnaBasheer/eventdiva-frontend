
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginCredentials } from "../../../core/models/common.model";



@Injectable()


export class AdminAuthService {
    constructor(private http: HttpClient){}

    APIBASE_URL = 'http://localhost:2000/admin'


    AdminLogin(credentials: LoginCredentials): Observable<any> {
      return this.http.post<any>(`${this.APIBASE_URL}/login`, credentials, {
        withCredentials: true,
      })
    }

    adminLogout(){
      return this.http.get<any>(`${this.APIBASE_URL}/logout`,{
        withCredentials: true
      });
    }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('ad_access');
    }
}