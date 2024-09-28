import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VendorActions from './vendor.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginCredentials } from '../../../core/models/common.model';
import { Router } from '@angular/router';
import { VendorAuthService } from '../services/vendor-auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { VendorBroadcastChannelService } from '../services/broadcast-vendor.service';





@Injectable()


export class VendorEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private vendorService: VendorAuthService,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private vendorbroadcast: VendorBroadcastChannelService,
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.vendorLogin),
      mergeMap((credentials: LoginCredentials) =>
        this.vendorService.VendorLogin(credentials).pipe(
          map(response => {
            localStorage.setItem(environment.vn_accessKey, response?.data?.token);
            return VendorActions.vendorLoginSuccess({user: response?.data?.user});
          }),
          tap(async (response: any) => {
            console.log(response.user, "dfff")
            this.ngZone.run(() => {
              if(response.user?.vendorType === 'event-planner'){
                  this.router.navigate(['/vendor/event-planner/dashboard'], {replaceUrl: true});
              } else if(response.user?.vendorType === 'venue-vendor'){
                  this.router.navigate(['/vendor/venue-vendor/dashboard'], {replaceUrl: true});
              }
            });
            this.toastr.success('Login successfully!');
          }),
          catchError(error => {
            if (error?.status == 401 ) {
              return of(VendorActions.vendorLoginFailure({
                error: {
                  status: 401,
                  message: 'Invalid credentials. Please try again.'
                }
              }));
            } else if(error?.status !== 403){
              this.toastr.error("An error occurred during login");
            }
            return of(VendorActions.vendorLoginFailure({ error: error?.message }));
          })
        )
      )
    )
  );


  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.vendorLoginSuccess),
      tap((user) => {
        localStorage.setItem(environment.vendorInfo, JSON.stringify(user.user));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.vendorLogOut),
      switchMap(() =>
        this.vendorService.vendorLogout().pipe(
          tap(() => this.vendorbroadcast.sendMessage({ type: 'VENDOR_LOGOUT' })),
          map(() => VendorActions.logOutSuccess()),
          catchError((error: any) => {
            console.error('Logout error:', error);
            return of(VendorActions.logOutFailure({ error: error.message }));
          })
        )
      )
    ),
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.logOutSuccess),
      tap(() => {
          localStorage.removeItem(environment.vendorInfo);
          localStorage.removeItem(environment.vn_accessKey);
          this.router.navigate(['/vendor/login'], { replaceUrl: true });
      }),
      catchError((error: any) => {
        console.error('Logout error:', error);
        return of(VendorActions.logOutFailure({ error: error.message }));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );

  sessionTimeOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VendorActions.vendorSessionExpired),
      tap(() => {
        this.vendorbroadcast.sendMessage({ type: 'VENDOR_LOGOUT' })
        this.toastr.warning("Session Expired! Login again!");
      }),
      map(() => VendorActions.logOutSuccess()),
    ),
  );
}



