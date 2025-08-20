import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

const pagesRoutes: Routes = [
  { path: 'empty', component: Empty },
  { path: '', redirectTo: 'empty', pathMatch: 'full' },
  { path: '**', redirectTo: 'empty' }
];

export default pagesRoutes;
