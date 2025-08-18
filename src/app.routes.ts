import { Routes } from '@angular/router';
import {AppLayout} from './app/layout/component/app.layout';
import {Login} from './app/pages/auth/login';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AppLayout,
    children: []
  },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
