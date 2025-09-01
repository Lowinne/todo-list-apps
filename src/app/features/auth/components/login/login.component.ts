import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';
import { AuthResult } from '../../models/auth-result.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) return;

    this.loading.set(true);
    this.error.set('');

    const creds: LoginRequest = this.loginForm.getRawValue();

    try {
      const result: AuthResult = await this.authService.login(creds); // ← Promise
      this.loading.set(false);

      if (result.success && result.user) {
        this.router.navigate(['/todos']);
      } else {
        this.error.set(result.error ?? 'Erreur de connexion');
      }
    } catch (err: unknown) {
      this.loading.set(false);
      const msg = err instanceof Error ? err.message : 'Erreur de connexion';
      this.error.set(msg);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['email']) return "Format d'email invalide";
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}
