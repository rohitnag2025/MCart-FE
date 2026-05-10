import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-callback',
  templateUrl: './social-callback.html',
  styleUrls: ['./social-callback.scss']
})
export class SocialCallback implements OnInit {
  message = 'Processing social login...';

  constructor(private router: Router) {}

  ngOnInit() {
    // Parse token and user from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');
    if (token) {
      localStorage.setItem('token', token);
      if (userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          if (user.email) localStorage.setItem('userEmail', user.email);
          if (user.name) localStorage.setItem('userName', user.name);
          if (user.userId) localStorage.setItem('userId', user.userId);
        } catch (e) {
          // fallback: do nothing
        }
      }
      this.message = 'Login successful! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 1000);
    } else {
      this.message = 'Login failed: No token found.';
    }
  }
}
