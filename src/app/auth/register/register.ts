import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  gender = '';
  email = '';
  password = '';
  phone = '';
  error = '';
  success = '';

  async onRegister(event: Event) {
    event.preventDefault();
    this.error = '';
    this.success = '';
    if (!this.gender || !this.email || !this.password || !this.phone) {
      this.error = 'All fields are required.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
      this.error = 'Invalid email format.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (!/^\d{10,}$/.test(this.phone)) {
      this.error = 'Phone must be at least 10 digits.';
      return;
    }
    try {
      const res = await fetch(`${environment.apiUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender: this.gender,
          email: this.email,
          passwordHash: this.password,
          phone: this.phone,
          name: ''
        })
      });
      if (!res.ok) {
        const data = await res.json();
        this.error = data?.message || 'Registration failed.';
      } else {
        this.success = 'Registration successful! Please check your email to confirm your account.';
        this.gender = this.email = this.password = this.phone = '';
      }
    } catch (err) {
      this.error = 'Registration failed. Please try again.';
    }
  }
}
