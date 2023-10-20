import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthenticationService],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access for authenticated users', () => {
    spyOn(authService, 'getIsLoggedIn').and.returnValue(true);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBe(true);
  });

  it('should redirect unauthenticated users to the login page', () => {
    spyOn(authService, 'getIsLoggedIn').and.returnValue(false);
    const routerNavigateSpy = spyOn(router, 'navigate');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBe(false);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
  });
});
