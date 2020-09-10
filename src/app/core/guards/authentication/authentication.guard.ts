import { AuthenticationService } from './../../auth/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService) { }

  canActivate(): Observable<boolean> {
    return this.authenticationService.isAuthenticated();
  }

}
