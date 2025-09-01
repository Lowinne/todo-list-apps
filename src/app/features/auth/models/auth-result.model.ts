// src/app/features/auth/models/auth-result.model.ts
import { User } from './user.model';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}
