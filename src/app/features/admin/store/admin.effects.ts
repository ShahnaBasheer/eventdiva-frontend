import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from './admin.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoginCredentials } from '../../../core/models/common.model';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { AdminBroadcastChannelService } from '../services/broadcast-admin.service';


@Injectable({
  providedIn: 'root'
})


export class AdminEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private adminService: AdminAuthService,
    private toastr: ToastrService,
    private adminbroadcast: AdminBroadcastChannelService
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.userLogin),
      mergeMap((credentials: LoginCredentials) =>
        this.adminService.AdminLogin(credentials).pipe(
          map(response => {
            localStorage.setItem(environment.ad_accessKey, response?.data?.token);
            return AdminActions.adminLoginSuccess({user: response?.data?.user});
          }),
          tap(() => {
            this.toastr.success('Login successfully!', 'Success');
            this.router.navigate(['/admin/dashboard'], {replaceUrl: true});
          }),
          catchError(error => {
            if (error?.status == 401) {
              return of(AdminActions.adminLoginFailure({
                error: {
                  status: 401,
                  message: 'Invalid credentials. Please try again.'
                }
              }));
            } else {
              this.toastr.error("An error occurred during login", 'Failed');
            }
            return of(AdminActions.adminLoginFailure({ error }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.adminLoginSuccess),
      tap((user) => {
        localStorage.setItem(environment.adminInfo, JSON.stringify(user.user));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );




  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.adminLogOut),
      switchMap(() =>
        this.adminService.adminLogout().pipe(
          tap(() => {
            this.adminbroadcast.sendMessage({ type: 'ADMIN_LOGOUT' });
          }),
          map(() => AdminActions.logOutSuccess()),
          catchError((error: any) => {
            console.error('Logout error:', error);
            return of(AdminActions.logOutFailure({ error }));
          })
        )
      )
    )
  );


  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.logOutSuccess),
      tap(() => {
          localStorage.removeItem(environment.adminInfo);
          localStorage.removeItem(environment.ad_accessKey);
          this.router.navigate(['/admin/login'], { replaceUrl: true });
      }),
      catchError((error: any) => {
        console.error('Logout error:', error);
        return of(AdminActions.logOutFailure({ error }));
      })
    ),
    { dispatch: false } // This effect does not dispatch any further actions
  );


  sessionTimeOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.adminSessionExpired),
      tap(() => {
        this.adminbroadcast.sendMessage({ type: 'ADMIN_LOGOUT' })
        this.toastr.warning("Session Expired! Please Login again!", 'Warning');
      }),
      map(() => AdminActions.logOutSuccess()),
    ),
  );


}


// logout$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AdminActions.adminLogOut),
//     switchMap(() =>
//       this.adminService.adminLogout().pipe(
//         tap(() => {
//           this.adminbroadcast.sendMessage({ type: 'ADMIN_LOGOUT' })
//         }),
//         map(() => AdminActions.logOutSuccess()),
//       )
//     )
//   ),
// );
