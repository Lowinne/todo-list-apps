// src/app/features/todos/todos.routes.ts
import { Routes } from '@angular/router';
import { TodoListComponent } from '../todos/components/todo-list.component';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
];
