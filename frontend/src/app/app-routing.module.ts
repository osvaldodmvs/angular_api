import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OperationsComponent } from './operations/operations.component';
import { MovementsComponent } from './movements/movements.component';
import { WithdrawDepositComponent } from './withdraw-deposit/withdraw-deposit.component';


const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'operations', component : OperationsComponent},
  {path : 'movements', component : MovementsComponent},
  {path : 'operation', component : WithdrawDepositComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
