import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout'; 
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovementsComponent } from './movements/movements.component';
import { OperationsComponent } from './operations/operations.component'; 
import { WithdrawDepositComponent } from './withdraw-deposit/withdraw-deposit.component'; 

import { HttpLoggingInterceptor } from './services/http-logging.service';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

const MaterialComponents = [
	MatButtonModule,
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	MatCardModule,
	MatExpansionModule,
	MatSelectModule,
	MatDividerModule,
	MatIconModule,
	MatTableModule,
];
@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
  		MovementsComponent,
  		OperationsComponent,
  		WithdrawDepositComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		LayoutModule,
		HttpClientModule,
		MaterialComponents,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpLoggingInterceptor,
			multi: true,
		  },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
