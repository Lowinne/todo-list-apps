import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { TODOS_ROUTES } from './features/todos/todo.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTES, // /auth/login
  },
  {
    path: '',
    children: TODOS_ROUTES, // /
    pathMatch: 'full',
  },
];
