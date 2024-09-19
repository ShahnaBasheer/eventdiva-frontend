import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerAuthService } from '../services/auth.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginCredentials } from '../../../core/models/common.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { CustomerBroadcastChannelService } from '../services/broadcast-customer.service';
import { CustomerWebRTCService } from '../services/customerWebrtc.service';



@Injectable()


export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private customerService: CustomerAuthService,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private customerbroadcast: CustomerBroadcastChannelService,
    private customerWebrtc: CustomerWebRTCService
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.userLogin),
      mergeMap((credentials: LoginCredentials) =>
        this.customerService.CustomerLogin(credentials).pipe(
          map(response => {
            localStorage.setItem(environment.cu_accessKey, response?.data?.token);
            return CustomerActions.loginSuccess({user: response?.data?.user, token: response?.data?.token });
          }),
          tap(async (res) => {
            this.toastr.success('Login successfully');
            this.ngZone.run(() => {
              this.router.navigate(['/home'], {replaceUrl: true});
            });
          }),
          catchError(error => {
            if (error?.status == 401) {
              return of(CustomerActions.loginFailure({
                error: {
                  status: 401,
                  message: 'Invalid credentials. Please try again.'
                }
              }));
            } else {
              this.toastr.error("An error occurred during login")
            }
            return of(CustomerActions.loginFailure({ error: error.error }));
          })
        )
      )
    )
  );

  googleSignin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.googleSignin),
      mergeMap(action =>
        this.customerService.signInwithGoogle(action.token).pipe(
          map(response => {
            localStorage.setItem(environment.cu_accessKey, response?.data?.token);
            return CustomerActions.loginSuccess({user: response?.data?.user, token: response?.data?.token});
          }),
          tap((res) => {
            this.toastr.success('Login successfully!');
            this.ngZone.run(() => {
              this.router.navigate(['/home'], {replaceUrl: true});
            });
          }),
          catchError(error => {
            if(error.status !== 403){
              this.toastr.error("An error occurred during Google Authentication")
            }
            return of(CustomerActions.loginFailure({ error: null }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loginSuccess),
      tap((data) => {
        localStorage.setItem(environment.customerInfo, JSON.stringify(data.user));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.logOut),
      switchMap(() =>
        this.customerService.userLogout().pipe(
          tap(() => this.customerbroadcast.sendMessage({ type: 'CUSTOMER_LOGOUT' })),
          map(() => CustomerActions.logOutSuccess()),
        )
      )
    ),
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.logOutSuccess),
      tap(() => {
          localStorage.removeItem(environment.customerInfo);
          localStorage.removeItem(environment.cu_accessKey);
          this.router.navigate(['/login'], { replaceUrl: true });
      }),
      catchError((error: any) => {
        console.error('Logout error:', error);
        return of(CustomerActions.logOutFailure({ error }));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );



  sessionTimeOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.sessionExpired),
      tap(() => {
        this.customerbroadcast.sendMessage({ type: 'CUSTOMER_LOGOUT' })
        this.toastr.warning("Session Expired! Please Login again!");
      }),
      map(() => CustomerActions.logOutSuccess()),
    ),
  );


}



