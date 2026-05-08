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
    // Parse token from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      this.message = 'Login successful! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.message = 'Login failed: No token found.';
    }
  }
}
