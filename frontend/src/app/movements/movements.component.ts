import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
	selector: 'app-movements',
	templateUrl: './movements.component.html',
	styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
	
	movement_url:string = environment.backendhost+':'+environment.backendport+'/api/movements';
	
	movements: any[] = [];
	userBalance: number = 0;
	displayedColumns: string[] = ['date', 'amount', 'operation'];
	
	constructor(private http: HttpClient) {}
	
	ngOnInit() {
		this.http.get<any>(this.movement_url).subscribe((data) => {
			this.movements = data.movements;
			this.userBalance = data.balance;
		});
	}
}
