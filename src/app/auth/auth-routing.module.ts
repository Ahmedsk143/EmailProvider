import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigniinComponent } from './signin/signiin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { CanActivateGuardService } from '../can-activate-guard.service';
const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [CanActivateGuardService],
  },
  { path: 'signout', component: SignoutComponent },
  {
    path: 'signin',
    component: SigniinComponent,
    canActivate: [CanActivateGuardService],
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/signin',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
