import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(private http: HttpClient,private router: Router,private authService: AuthenticationService) {}

	isLoggedIn:boolean = false;
	login_url:string = environment.backendhost+':'+environment.backendport+'/api/login';
	logout_url:string = environment.backendhost+':'+environment.backendport+'/api/logout';

	

	onSubmit(form: any): void {
		if (form.valid) {
			const userData = {
				email: form.value.email,
				password: form.value.password
			};
						this.http.post(this.login_url, userData).pipe(
			tap((response) => {
				console.log('Login successful:', response);
				this.authService.setIsLoggedIn(true);
				this.router.navigate(['/']);
			}),
			catchError((error) => {
				console.error('Login failed:', error);
				return of(error);
			})
			).subscribe();
		} else {
			console.log('Form is invalid. Please correct the errors.');
		}
	}

	logout(): void {
		this.http.post(this.logout_url, {}).pipe(
			tap((response) => {
				console.log('Logout successful:', response);
				this.authService.setIsLoggedIn(false);
				this.router.navigate(['/']);
			}),
			catchError((error) => {
				console.error('Logout failed:', error);
				return of(error);
			})
			).subscribe();
		this.isLoggedIn = false;
	}

	isLoggedin(): boolean {
		return this.isLoggedIn;
	}
	
}
