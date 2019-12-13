import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { OverviewComponent } from './pages/overview/overview.component';
import { SecretPageComponent } from './pages/secret-page/secretpage.component';

const routes: Routes = [
  { 
    path: 'admin', 
    component: SecretPageComponent ,
    canActivate: [AppAuthGuard]
  },
  { 
    path: 'overview', 
    component: OverviewComponent ,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
