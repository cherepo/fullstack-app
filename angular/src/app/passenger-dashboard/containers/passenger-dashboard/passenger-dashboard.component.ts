import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';
import { PassengerService } from '../../service/passenger.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
      </passenger-count>
      <div *ngFor='let item of passengers$ | async'>
        {{ item.fullName }}
      </div>
      <hr>
      <div *ngFor="let passenger of passengers;">
        {{ passenger.fullname }}
      </div>
      <hr>
      <passenger-detail
        *ngFor="let passenger of passengers$ | async"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
      <hr>
      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  passengers$: Observable<Passenger[]>;

  constructor(private passengerDashboardService: PassengerDashboardService, private passengerService: PassengerService) {}
  ngOnInit() {
    this.passengers$ = this.passengerService.watch()
      .valueChanges
      .pipe(
        map(result => result.data['passengers'])
      );
    
    this.passengerDashboardService
      .getPassengers()
      .subscribe((data: Passenger[]) => this.passengers = data);
  }
  
  handleEdit(event: Passenger) {
    this.passengerDashboardService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
  handleRemove(event: Passenger) {
    this.passengerDashboardService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      });
  }
}