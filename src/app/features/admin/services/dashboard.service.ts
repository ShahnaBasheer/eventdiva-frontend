import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";




@Injectable({
  providedIn: 'root',
})


export class DashboardService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = 'http://localhost:2000/admin'


    getDashboardPage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/dashboard`, {
            withCredentials: true,
        });
    }
}