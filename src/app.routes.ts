import { Routes } from '@angular/router';
import {Login} from './app/pages/auth/login';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guards/auth.guard';
import { AppLayout } from './app/layout/component/app.layout';
import { Product } from './app/pages/product/product';

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
      {
        path: 'product',
        component: Product
      },
      {
        path: 'pages',
        loadChildren: () => import('./app/pages/pages.routes')
          .then(m => m.default)
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      }
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
