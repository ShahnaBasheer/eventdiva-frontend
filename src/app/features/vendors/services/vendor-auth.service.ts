
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginCredentials } from "../../../core/models/common.model";
import { environment } from "../../../../environments/environment";



@Injectable({
  providedIn: 'root',
})


export class VendorAuthService {
    private emailSubject = new BehaviorSubject<string >('');
    email$ = this.emailSubject.asObservable();

    constructor(private http: HttpClient){
        const storedEmail = localStorage.getItem('vendorVerificationEmail') || '';
        if (storedEmail) this.emailSubject.next(storedEmail);
    }

    vendorRegistration(userData: any): Observable<any> {
      console.log(userData)
      return this.http.post<any>(`${environment.vendorUrl}/signup`, userData, {
        withCredentials: true,
      }).pipe(
          tap((response: any) => {
            const email = response?.data?.email;
            if (email) {
              localStorage.setItem('vendorVerificationEmail', email);
              this.setEmail(email)
            }
          })
      );
    }

    VendorLogin(credentials: LoginCredentials): Observable<any> {
      return this.http.post<LoginCredentials>(`${environment.vendorUrl}/login`, credentials, {
        withCredentials: true,
      })
    }

    verifyOTP(email: string, otp: string): Observable<any> {
      const payload = { email, otp };
      return this.http.post<any>(`${environment.vendorUrl}/verify-otp`, payload,
        { withCredentials: true }).pipe(
          tap((response: any) => {
            localStorage.removeItem('vendorVerificationEmail');
          }),
          catchError((error) => {
            throw error;
          })
      );
    }

    resendOTP(email: string): Observable<any> {
      return this.http.post<any>(`${environment.vendorUrl}/resend-otp`, { email }, {
        withCredentials: true
      });
    }

    setEmail(email: string) {
      this.emailSubject.next(email);
    }


    vendorLogout(){
        return this.http.get<any>(`${environment.vendorUrl}/logout`,{
          withCredentials: true
        });
    }
}
