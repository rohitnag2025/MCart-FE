import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
})
export class ResetPassword {
  email = '';
  newPassword = '';
  error = '';
  success = '';

  async onResetPassword(event: Event) {
    event.preventDefault();
    this.error = '';
    this.success = '';
    if (!this.email || !this.newPassword) {
      this.error = 'All fields are required.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
      this.error = 'Invalid email format.';
      return;
    }
    if (this.newPassword.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    try {
      const res = await fetch(`${environment.apiUrl}/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, newPasswordHash: this.newPassword })
      });
      if (!res.ok) {
        const data = await res.json();
        this.error = data?.message || 'Failed to reset password.';
      } else {
        this.success = 'Password reset successful! You can now log in.';
        this.email = this.newPassword = '';
      }
    } catch (err) {
      this.error = 'Failed to reset password. Please try again.';
    }
  }
}
