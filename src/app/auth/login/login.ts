
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  onLogin(event: Event) {
    event.preventDefault();
    // TODO: Call backend /api/users/login endpoint with email/password
    // Example: fetch(`${environment.apiUrl}/users/login`, ...)
    alert('Login with email/password not implemented in this demo.');
  }

  loginWithProvider(provider: 'facebook' | 'twitter') {
    // Redirect to backend social login endpoint
    window.location.href = `${environment.apiUrl}/users/external-login/${provider}`;
  }
}
