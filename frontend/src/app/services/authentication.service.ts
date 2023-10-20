import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(logged : boolean): void {
    this.isLoggedIn = logged;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
