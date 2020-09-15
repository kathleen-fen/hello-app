import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../app/auth/auth.guard';


const routes: Routes = [
  { path: 'auth', component:  AuthComponent},
  { 
    path: 'main', 
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
