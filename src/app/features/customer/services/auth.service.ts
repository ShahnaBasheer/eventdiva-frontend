
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginCredentials } from "../../../core/models/common.model";
import { environment } from "../../../../environments/environment";




@Injectable({
  providedIn: 'root',
})

export class CustomerAuthService {
    private emailSubject = new BehaviorSubject<string >('');
    email$ = this.emailSubject.asObservable();

    constructor(private http: HttpClient){
        const storedEmail = localStorage.getItem('verificationEmail') || '';
        if (storedEmail) this.emailSubject.next(storedEmail);
    }

    APIBASE_URL = `${environment.customerUrl}`;


    customerRegistration(userData: any): Observable<any> {
      return this.http.post<any>(`${this.APIBASE_URL}/signup`, userData, {
        withCredentials: true,
      }).pipe(
          tap((response: any) => {
            const email = response?.data?.email;
            if (email) {
              localStorage.setItem('verificationEmail', email);
              this.setEmail(email)
            }
          })
      );
    }

    CustomerLogin(credentials: LoginCredentials): Observable<any> {
      return this.http.post<LoginCredentials>(`${this.APIBASE_URL}/login`, credentials, {
        withCredentials: true,
      })
    }

    verifyOTP(email: string, otp: string): Observable<any> {
      const payload = { email, otp };
      return this.http.post<any>(`${this.APIBASE_URL}/verify-otp`, payload,
        { withCredentials: true }).pipe(
          tap((response: any) => {
            localStorage.removeItem('verificationEmail');
          }),
          catchError((error) => {
            throw error;
          })
      );
    }

    resendOTP(email: string): Observable<any> {
      return this.http.post<any>(`${this.APIBASE_URL}/resend-otp`, { email }, {
        withCredentials: true
      });
    }


    setEmail(email: string) {
      this.emailSubject.next(email);
    }

    signInwithGoogle(credential: string): Observable<any> {
        return this.http.post<any>(`${this.APIBASE_URL}/auth/google`, { idToken: credential },{
          withCredentials: true
        });
    }

    getUserFromLocalStorage(){
      return localStorage.getItem(environment.customerInfo);
    }


    userLogout(){
        return this.http.get<any>(`${this.APIBASE_URL}/logout`,{
          withCredentials: true
        });
    }




}
