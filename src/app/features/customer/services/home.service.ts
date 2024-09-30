import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";




@Injectable()


export class HomeService {

    constructor(private http: HttpClient, private router: Router){}

    APIBASE_URL = `${environment.customerUrl}`


    getHomePage(): Observable<any>{
        return this.http.get<any>(`${this.APIBASE_URL}/home`, {
            withCredentials: true,
        }).pipe(
          tap((response: any) => {
              // console.log(response,"jnjjjji");
          }),
          catchError((error) => {
            console.log(error,"error")
            throw error;
          })
      );

    }
}
