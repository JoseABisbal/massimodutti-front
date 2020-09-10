import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { switchMap } from 'rxjs/operators';

const UNAUTHORIZED_MESSAGE = 'User doesnt have permissions to access to this page';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.authenticationService.isAuthenticated().pipe(switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return this.authenticationService.userCan(route.data.roles).pipe(switchMap((userCan) => {
          if (!userCan) {
            this.router.navigate([`error/${UNAUTHORIZED_MESSAGE}/authorization`]);
            return of(false);
          }
          return of(true);
        }));
      }
    }));
  }
}
