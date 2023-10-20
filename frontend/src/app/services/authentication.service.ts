import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient,private router: Router, private snackbarService: SnackbarService) { }

  logout_url:string = environment.backendhost+':'+environment.backendport+'/api/logout';

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(logged : boolean): void {
    this.isLoggedIn = logged;
  }

  logout(): void {
		this.http.post(this.logout_url, {}).pipe(
			tap((response) => {
				console.log('Logout successful:', response);
				this.setIsLoggedIn(false);
				this.router.navigate(['/']);
				this.snackbarService.showMessage('Logout successful');
			}),
			catchError((error) => {
				console.error('Login failed:', error);
				this.snackbarService.showMessage('Login failed');
				return of(error);
			})
			).subscribe();
	  }

}
