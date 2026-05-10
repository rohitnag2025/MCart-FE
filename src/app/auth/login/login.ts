
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
    @Output() loginSuccess = new EventEmitter<void>();
  email = '';
  passwordHash = '';
  error = '';

  constructor(private router: Router, private http: HttpClient, private location: Location) {}

  async onLogin(event: Event) {
    event.preventDefault();
    this.error = '';
    if (!this.email || !this.passwordHash) {
      this.error = 'Email and password are required.';
      return;
    }
    try {
      // Check if there was a guest cart (no userId before login)
      const guestUserId = localStorage.getItem('userId');
      const response = await this.http.post('http://localhost:5001/api/Users/login', {
        email: this.email,
        passwordHash: this.passwordHash
      }, { observe: 'response' }).toPromise();
      console.log('[Login] Raw response:', response);
      const res: any = response && response.body ? response.body : {};
      console.log('[Login] Response status:', response?.status);
      console.log('[Login] Response body:', res);
      if (response && response.status === 200 && res && res.token && res.user) {
        console.log('[Login] Login success block entered');
        localStorage.setItem('userEmail', res.user.email || this.email);
        localStorage.setItem('userName', res.user.name || res.user.email || this.email);
        if (res.user.userId) {
          localStorage.setItem('userId', res.user.userId);
        } else {
          localStorage.removeItem('userId');
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        // Debug: print localStorage values after setting
        console.log('[Login] localStorage after login:', {
          userId: localStorage.getItem('userId'),
          userEmail: localStorage.getItem('userEmail'),
          userName: localStorage.getItem('userName'),
          token: localStorage.getItem('token')
        });

        // If there was a guest cart, assign it to the logged-in user
        if (!guestUserId) {
          const assignUserPayload = { UserId: res.user.userId };
          this.http.post('http://localhost:5003/api/Orders/cart/assign-user', assignUserPayload).subscribe({
            next: () => console.log('[Login] Guest cart assigned to user'),
            error: err => console.error('[Login] Failed to assign guest cart:', err)
          });
        }

        // Redirect to the original page if available, else to products
        const redirectUrl = localStorage.getItem('postLoginRedirectUrl');
        if (redirectUrl) {
          localStorage.removeItem('postLoginRedirectUrl');
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['/products']);
        }
        // Ensure all localStorage is set before closing modal
        setTimeout(() => {
          console.log('[Login] Emitting loginSuccess event');
          this.loginSuccess.emit();
        }, 0);
      } else {
        console.log('[Login] Login failed or unexpected response:', res);
        this.error = res && res.message ? res.message : 'Invalid credentials.';
      }
    } catch (err: any) {
      this.error = err?.error?.message || 'Login failed. Please try again.';
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
