import { Routes } from '@angular/router';
import { HomeComponent } from '../main/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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



  { path: '**', redirectTo: '' }             
];
