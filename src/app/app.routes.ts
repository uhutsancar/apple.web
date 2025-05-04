import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from '../main/components/home/home.component';
import { AuthService } from '../main/components/login/auth.service';
import { inject } from '@angular/core';
import { authGuard } from '../main/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('../main/components/login/auth-routes')

  },
  {
    path: 'iphone',
    loadComponent: () => import('../main/components/iphone/iphone.component').then(m => m.IphoneComponent)

  },
  {
    path: 'airpods',
    loadComponent: () => import('../main/components/airpords/airpords.component').then(m => m.AirpordsComponent)

  },
  {
    path: 'airpods-max',
    loadComponent: () => import('../main/components/airpods-max/airpods-max.component').then(m => m.AirpodsMaxComponent)

  },

  {
    path: 'mac',
    loadComponent: () => import('../main/components/mac/mac.component').then(m => m.MacComponent)

  },

  {
    path: 'account',
    loadComponent: () => import('../main/components/account/account.component').then(m => m.AccountComponent),
  canMatch: [authGuard]
  },



  { 
    path: '**', 
    redirectTo: 'auth/login',
    pathMatch: 'full'
  
  }             
];
