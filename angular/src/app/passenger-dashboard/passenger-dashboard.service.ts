import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

// consuming json-server mock data
const PASSENGER_API: string = 'http://localhost:3000/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get<Passenger[]>(PASSENGER_API)
      .pipe(
        map((response: any) => response)
      ).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http
      .get<Passenger>(`${PASSENGER_API}/${id}`).pipe(
        map((response: any) => response)
      ).pipe(catchError((error: any) => Observable.throw(error)));
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger, {headers}).pipe(
        map((response: any) => response)
      ).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`).pipe(
        map((response: any) => response)
      ).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

}