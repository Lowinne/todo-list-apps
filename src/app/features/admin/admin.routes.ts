// src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminComponent } from '../auth/components/admin/admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
];
