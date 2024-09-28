import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import {
  loginSuccess,
  sessionExpired,
} from '../../features/customer/store/customer.actions';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenService } from '../services/jwtToken.service';
import {
  adminLoginSuccess,
  adminSessionExpired,
} from '../../features/admin/store/admin.actions';
import {
  vendorLoginSuccess,
  vendorSessionExpired,
} from '../../features/vendors/store/vendor.actions';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const store = inject(Store);
  const tokenService = inject(TokenService);

  let tokenKey: string;
  const postRequests = new Set([
    '/login',
    '/signup',
    '/admin/login',
    '/auth/google',
    '/vendor/login',
    '/vendor/signup',
    '/verify-otp',
    '/resend-otp',
  ]);
  const path = new URL(req.url).pathname;
  const isPostRequest = postRequests.has(path);

  if (req.method === 'POST' && isPostRequest) return next(req);

  if (path.startsWith('/admin/')) {
    tokenKey = 'ad_access';
  } else if (path.startsWith('/vendor/')) {
    tokenKey = 'vn_access';
  } else {
    tokenKey = 'cu_access';
  }

  let token!: string;

  try {
    token = tokenService.getToken(tokenKey) || '';
  } catch (error: any) {
    console.error('Error parsing token from localStorage', error?.message);
  }

  if (token && !isPostRequest) {
    const modified = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(modified).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const data = event.body?.data;
          if (data && !path.includes('/logout')) {
            let newToken: string = data.token;
            let user = data?.user;

            if (newToken) {
              tokenService.setToken(tokenKey, newToken);
            } else {
              newToken = token;
            }

            console.log('auth interceptor triggering')

            if (user) {
              if (user.role === 'admin') {
                store.dispatch(adminLoginSuccess({ user }));
              } else if (user.role === 'customer') {
                store.dispatch(loginSuccess({ user, token }));
              } else if (user.role === 'vendor') {
                store.dispatch(vendorLoginSuccess({ user }));
              }
            } else {
              if (path.startsWith('/admin/')) {
                store.dispatch(adminSessionExpired());
              } else if (path.startsWith('/vendor/')) {
                store.dispatch(vendorSessionExpired());
              } else {
                store.dispatch(sessionExpired());
              }
            }
          }
        }
      })
    );
  }
  console.log(path, 'without token', req.method);

  return next(req);
};
