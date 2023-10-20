import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	constructor(private http: HttpClient, private router: Router) {}

	url:string = environment.backendhost+':'+environment.backendport+'/api/signup';

	onSubmit(form: any): void {
		if (form.valid) {
			console.log('Form submitted with data:', form.value);
			const userData = {
				email: form.value.email,
				password: form.value.password,
			};
			this.http.post(this.url, userData).pipe(tap((response) => {
			console.log('Registration successful:', response);
			this.router.navigate(['/login']);
		}),
		catchError((error) => {
			console.error('Registration failed:', error);
			return of(error);
		})
		)
		.subscribe();
	} else {
		console.log('Form is invalid. Please correct the errors.');
	}
}
}
