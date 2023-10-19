import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(private http: HttpClient) {}
	
	onSubmit(form: any): void {
		if (form.valid) {
			// Form is valid, perform login actions
			const userData = {
				email: form.value.email,
				password: form.value.password
			};
			
			// Send a POST request to the backend login endpoint
			this.http.post('http://localhost:6060/api/login', userData).pipe(
			tap((response) => {
				// Login successful, handle the response (e.g., store tokens, redirect)
				console.log('Login successful:', response);
				// You can perform actions like redirecting the user, storing tokens, etc.
			}),
			catchError((error) => {
				// Login failed, handle the error
				console.error('Login failed:', error);
				// Show error message to the user 
				return of(error);
			})
			).subscribe();
		} else {
			// Form is invalid, show validation errors
			console.log('Form is invalid. Please correct the errors.');
		}
	}
	
}
