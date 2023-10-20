import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(private http: HttpClient,private router: Router,private authService: AuthenticationService, private snackbarService: SnackbarService) {}

	login_url:string = environment.backendhost+':'+environment.backendport+'/api/login';


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
				this.snackbarService.showMessage('Login successful');
			}),
			catchError((error) => {
				this.snackbarService.showMessage('Login failed');
				console.error('Login failed:', error);
				return of(error);
			})
			).subscribe();
		} else {
			this.snackbarService.showMessage('Form is invalid. Please correct the errors.');
			console.log('Form is invalid. Please correct the errors.');
		}
	}
	
}
