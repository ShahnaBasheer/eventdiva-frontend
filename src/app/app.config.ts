import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { appReducer } from './state/app.state';



export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes, withComponentInputBinding()
      ),
      provideHttpClient(),
      provideStore(appReducer),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
      provideEffects([]),
      provideHttpClient(withInterceptors([
        AuthInterceptor,
        ErrorInterceptor]
      )),
      provideAnimationsAsync(),
      provideToastr({
        timeOut: 5000, // Default display time in milliseconds
        closeButton: true, // Show a close button
        progressBar: true, // Show a progress bar
        preventDuplicates: true, // Prevent duplicate toasts
        tapToDismiss: true, // Allow dismissal on click
      })
  ]
};


