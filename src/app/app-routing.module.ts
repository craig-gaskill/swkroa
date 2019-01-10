import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './security/login/login.component';
import {HomeComponent} from './feature/home/home.component';
import {AuthenticationGuard} from './security/guard/authentication.guard';

const routes: Routes = [
  // authentication routes
  {
    path: 'auth/login',
    component: LoginComponent
  },

  // primary routes
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'memberships',
    loadChildren: './feature/memberships/memberships.module#MembershipsModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'accounting',
    loadChildren: './feature/accounting/accounting.module#AccountingModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'reports',
    loadChildren: './feature/reports/reports.module#ReportsModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'maintenance',
    loadChildren: './feature/maintenance/maintenance.module#MaintenanceModule',
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
