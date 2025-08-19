import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';

export default [
  {
    path: 'login',
    component: Login,
    title: 'Login'
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
