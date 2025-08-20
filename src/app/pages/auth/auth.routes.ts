import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Account } from './account';
import { AuthGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: 'account',
    component: Account,
    title: 'Nova Conta',
    canActivate: [AuthGuard],
    data: { public: true }
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
    canActivate: [AuthGuard],
    data: { public: true }
  },
  {
    path: 'access',
    component: Access,
    title: 'Acesso Negado'
  },
  {
    path: 'error',
    component: Error,
    title: 'Erro'
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
] as Routes;
