import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { TODOS_ROUTES } from './features/todos/todo.routes';

export const routes: Routes = [
  { path: 'auth', children: AUTH_ROUTES }, // /auth/login
  { path: 'todos', children: TODOS_ROUTES }, // /todos

  // page d'accueil = todos
  { path: '', redirectTo: 'todos', pathMatch: 'full' },

  // fallback
  { path: '**', redirectTo: 'todos' },
];
