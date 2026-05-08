import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.html',
  styleUrls: ['./email-confirmation.scss'],
})
export class EmailConfirmation implements OnInit {
  message = '';

  async ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const token = params.get('token');
    if (!email || !token) {
      this.message = 'Invalid confirmation link.';
      return;
    }
    try {
      const res = await fetch(`${environment.apiUrl}/users/confirm-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
      if (!res.ok) {
        const data = await res.json();
        this.message = data?.message || 'Email confirmation failed.';
      } else {
        this.message = 'Email confirmed! You can now log in.';
      }
    } catch (err) {
      this.message = 'Email confirmation failed. Please try again.';
    }
  }
}
