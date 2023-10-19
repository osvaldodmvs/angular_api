import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})


export class RegisterComponent {
	constructor(private http: HttpClient) {
		
	}
	onSubmit(form: any): void {
		if (form.valid) {
			//form is valid, now perform actions
			console.log('Form submitted with data:', form.value);
			//send the form data to the server or perform other actions here
			const userData = {
				email: form.value.email,
				password: form.value.password,
			};
			//send a POST request to backend registration endpoint
			this.http.post('http://localhost:6060/api/signup', userData).pipe(tap((response) => {
			//registration successful,
			console.log('Registration successful:', response);
			// You can perform actions like redirecting the user, showing a success message, etc.
		}),
		catchError((error) => {
			//registration failed, handle the error
			console.error('Registration failed:', error);
			//show error message to the user
			return of(error);
		})
		)
		.subscribe();
	} else {
		// Form is invalid, show validation errors
		console.log('Form is invalid. Please correct the errors.');
		
	}
}
}
