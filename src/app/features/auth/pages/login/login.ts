import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService)
  private form = inject(FormBuilder)

  isSubmitting = signal(false)
  error = signal<string | null>(null)

  loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    this.isSubmitting.set(true)
    try {
      await this.authService.login(this.loginForm.value)
    } catch (error: any) {
      console.log(error)
      this.error.set(error.error.errors)
    } finally {
      this.isSubmitting.set(false)
    }
  }
}
