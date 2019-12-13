import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  template: `
    <div>
      <h1>Overview</h1>
      <a routerLink="/admin">Secret Page</a>
    </div>
  `
})
export class OverviewComponent{

}