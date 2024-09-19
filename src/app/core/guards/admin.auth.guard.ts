import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/jwtToken.service';



export const AdminAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
  const router =  inject(Router);
  const jwtTokenService = inject(TokenService);

  const url = state.url;
  const token = jwtTokenService.isValidToken('ad_access');

  if(token){
    if(url === '/admin/login'){
      return router.createUrlTree(['/admin/dashboard']);
    }
  } else {
      if(url !== '/admin/login'){
        return router.createUrlTree(['/admin/login']);
      }
  }

  return true;
}




