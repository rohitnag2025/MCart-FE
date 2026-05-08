import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPassword {
  email = '';
  error = '';
  success = '';

  async onForgotPassword(event: Event) {
    event.preventDefault();
    this.error = '';
    this.success = '';
    if (!this.email) {
      this.error = 'Email is required.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
      this.error = 'Invalid email format.';
      return;
    }
    try {
      const res = await fetch(`${environment.apiUrl}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email })
      });
      if (!res.ok) {
        const data = await res.json();
        this.error = data?.message || 'Failed to send reset link.';
      } else {
        this.success = 'Password reset link sent! Please check your email.';
        this.email = '';
      }
    } catch (err) {
      this.error = 'Failed to send reset link. Please try again.';
    }
  }
}
