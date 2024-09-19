import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable({
  providedIn: 'root',
})


export class AllVendorsService {

    constructor(private http: HttpClient, private router: Router){}

    getAllEventPlannersPage(): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}/vendors/event-planners`, {
            withCredentials: true,
        })
    }

    getAllVenuesPage(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}/vendors/venues`, {
          withCredentials: true,
      })
  }
}
