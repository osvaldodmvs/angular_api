import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Component({
	selector: 'app-withdraw-deposit',
	templateUrl: './withdraw-deposit.component.html',
	styleUrls: ['./withdraw-deposit.component.css']
})

export class WithdrawDepositComponent {
  deposit_withdrawal_url: string = environment.backendhost + ':' + environment.backendport + '/api/operation';

  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      const userData = {
        amount: form.value.amount,
        operation: form.value.operation,
      };
	  console.log('Form submitted with data:', userData);
      this.http.post(this.deposit_withdrawal_url, userData).pipe(
        tap((response) => {
          console.log(userData.operation === 'withdraw' ? 'Withdrawal successful:' : 'Deposit successful:', response);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.log(userData.operation === 'withdraw' ? 'Withdrawal failed:' : 'Deposit failed:', error);
          return of(error);
        })
      ).subscribe();
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
  }
}
