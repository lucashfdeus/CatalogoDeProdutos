import { Routes } from '@angular/router';
import {AppLayout} from './app/layout/component/app.layout';
import {Login} from './app/pages/auth/login';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/pages/auth/auth.routes')
  },
  {
    path: 'notfound',
    component: Notfound
  },
  {
    path: '**',
    redirectTo: '/notfound'
  }
];
