import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthenticationService, public router: Router, private snackbarService: SnackbarService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    if (this.authService.getIsLoggedIn() === true) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.snackbarService.showMessage('Please login first');
      return false;
    }
  }
}