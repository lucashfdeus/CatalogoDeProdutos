import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../pages/service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const isPublic = route.data['public'] as boolean;

    if (this.authService.isAuthenticated()) {
      if (isPublic) {
        return this.router.createUrlTree(['/home']);
      }
      return true;
    } else {
      if (isPublic) {
        return true;
      }
      return this.router.createUrlTree(['/auth/access'], {
        queryParams: {
          error: 'Acesso não autorizado',
          status: 401
        }
      });
    }
  }
}
