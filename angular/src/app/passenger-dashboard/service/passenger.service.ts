import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'apollo-link';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengerService extends Query<Response> {
  // getAllPassenger(): Observable<Passenger> {
  document = gql`
    query allPassengers {
      passengers{
        id
        checkedIn
        fullName
        dateOfBirth
        baggage
      }
    }
  `;

    // let result$: Observable<any>;
    // this.apollo
    //   .watchQuery<any>({
    //     query,
    //     fetchPolicy: "network-only"
    //   })
    //   .valueChanges.pipe(map((result: any) => result.data.passengers))
    //   .subscribe(result => result$ = of(result));
    // this.apollo.query({ query })...
  // }
}