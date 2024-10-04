

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable()


export class EventPlannerAdminService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.adminUrl}/event-planners`


    getPlannersPage(page: number, limit: number): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}`, {
            params: {
              page: page.toString(), limit: limit.toString()
            },
            withCredentials: true,
        });
    }

    getPlannerBookings(page:number, limit: number): Observable<any>{
      return this.http.get<any>(`${this.APIBASE_URL}/bookings`, {
        params: {
          page: page.toString(), limit: limit.toString()
        },
        withCredentials: true,
      });
  }

  getPlannerDetails(slug: string): Observable<any>{
    console.log("heyyy i am called")
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
