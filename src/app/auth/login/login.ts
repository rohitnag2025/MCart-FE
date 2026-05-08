
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  async onLogin(event: Event) {
    event.preventDefault();
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }
    // Simulate login (replace with real API call)
    // Example: const res = await fetch(`${environment.apiUrl}/users/login`, ...)
    if (this.email === 'demo@example.com' && this.password === 'password') {
      localStorage.setItem('userEmail', this.email);
      localStorage.setItem('userName', 'Demo User');
      this.router.navigate(['/products']);
    } else {
      this.error = 'Invalid credentials. Try demo@example.com / password.';
    }
  }

  loginWithProvider(provider: 'facebook' | 'twitter') {
    if (provider === 'facebook') {
      this.router.navigate(['/auth/facebook-login']);
    } else if (provider === 'twitter') {
      this.router.navigate(['/auth/twitter-login']);
    }
  }
}
