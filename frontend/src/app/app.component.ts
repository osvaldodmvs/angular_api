import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple bank API';
  
  constructor(private authService: AuthenticationService) {}
  
  isUserLoggedIn(){
    return this.authService.getIsLoggedIn();
  }

  triggerLogout(){
    this.authService.logout();
  }

}
