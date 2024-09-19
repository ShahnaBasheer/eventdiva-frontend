import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/jwtToken.service';


// const publicRoutes = ['/home', '/venues'];

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
    const router =  inject(Router);
    const jwtTokenService = inject(TokenService)

    const url = state.url;
    const token = jwtTokenService.isValidToken('cu_access');

    if(token){
        if(url === '/login' || url === '/signup'){
          return router.createUrlTree(['/home']);
        }
    }
    return true;
}

  // Allow access to public routes
    //  if (publicRoutes.includes(url)) {
    //       return true;
    //  }
