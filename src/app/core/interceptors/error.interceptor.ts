import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminSessionExpired } from '../../features/admin/store/admin.actions';
import { Router } from '@angular/router';
import { logOutSuccess as vendorLogout, vendorSessionExpired } from '../../features/vendors/store/vendor.actions';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/jwtToken.service';
import { logOutSuccess, sessionExpired } from '../../features/customer/store/customer.actions';




export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const store = inject(Store);
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const jwtTokenService = inject(TokenService)
    const path = (new URL(req.url)).pathname;


    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred!';

            if (error.error instanceof ErrorEvent) {
                // Client-side errors
                // errorMessage = `Error: ${error.error.message}`;
                console.log('client side error', error.error.message);

            } else {
                // Server-side errors, error.error.message
                console.log('server side error');
                if(path.startsWith('/admin/')){
                    if(error.status === 401){
                      if(req.headers.has('Authorization')){
                        store.dispatch(adminSessionExpired());
                      }
                    }
                } else if(path.startsWith('/vendor/')){
                    if(error.status === 401){
                      if(req.headers.has('Authorization')){
                        store.dispatch(vendorSessionExpired());
                      }
                    } else if(error.status === 403){
                      toastr.error("Vendor's account is Blocked!");
                      store.dispatch(vendorLogout());
                    }
                } else {
                    if(error.status === 401 && req.headers.has('Authorization')){
                      store.dispatch(sessionExpired());
                    } else if(error.status === 401) {
                      router.navigate(['/login'], {replaceUrl: true })
                    } else if(error.status === 403){
                      toastr.error("User account is Blocked!", 'error');
                      store.dispatch(logOutSuccess());
                    }
                }


            }
            // throwError(() => new Error(errorMessage))
            return next(req);
        })
    );
};



// Swal.fire({
//   //     icon: 'error',
//   //     title: 'Oops...',
//   //     text: error.error.message,
//   // });


 // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

                // if (error.status === 404) {
                //     errorMessage = 'Resource not found';
                // } else if (error.status === 401) {
                //     errorMessage = 'Unauthorized';
                //     // You can redirect to the login page if needed
                //     router.navigate(['/login']);
                // } else if (error.status === 403) {
                //     errorMessage = 'Access forbidden';
                // } else if (error.status === 500) {
                //     errorMessage = 'Internal Server Error';
                // }


              // Swal.fire({
              //     icon: 'error',
              //     title: 'Oops...',
              //     text: errorMessage,
              // });
