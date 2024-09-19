

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable({
  providedIn: 'root',
})


export class EventPlannerAdminService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.baseUrl}/admin/event-planners`


    getPlannersPage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            withCredentials: true,
        });
    }

    getPlannerBookings(){
      return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
        withCredentials: true,
      });
  }

  getPlannerDetails(slug: string){
    return this.http.get<any>(`${this.APIBASE_URL}/details/${slug}`, {
      withCredentials: true,
    });
  }

  plannerStatusChange(slug: string, status: string): Observable<any>{
    return this.http.get<any>(`${this.APIBASE_URL}/${slug}/${status}`, {
      withCredentials: true,
    });
}
}
