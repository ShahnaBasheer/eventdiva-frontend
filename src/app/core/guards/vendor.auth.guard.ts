import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/jwtToken.service';
import { environment } from '../../../environments/environment'


// const publicRoutes = ['/home', '/venues'];

export const VendorAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
    const router =  inject(Router);
    const jwtTokenService = inject(TokenService)
    const url = state.url;
    const token = jwtTokenService.isValidToken(environment.vn_accessKey);
    let vendorInfo;
    let vendorType;

    try {
      vendorInfo = localStorage.getItem(environment.vendorInfo) || '';
      vendorType = JSON.parse(vendorInfo).vendorType;
    } catch (err: any) {
      vendorType = null;
    }
    console.log("heyyyy", url)
    if(token){

        if(url === '/vendor/login' || url === '/vendor/signup'){
            if(vendorType === environment.event_planner){
                return router.createUrlTree(['/vendor/event-planner/dashboard']);
            } else if(vendorType === environment.venue_vendor){
                return router.createUrlTree(['/vendor/venue-vendor/dashboard']);
            }
        } else {
          if ((url.startsWith('/vendor/event-planner') && vendorType !== environment.event_planner) ||
              (url.startsWith('/vendor/venue-vendor') && vendorType !== environment.venue_vendor)) {
            return router.createUrlTree(['/not-found']); // Redirect to "Not Found" page
          }
        }
    } else {
        if(url !== '/vendor/login' && url !== '/vendor/signup' && url !== '/vendor/otpverification'){
          return router.createUrlTree(['/vendor/login']);
        }
    }
    return true;
}
