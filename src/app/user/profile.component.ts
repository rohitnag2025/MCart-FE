import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <p>Email: {{ email }}</p>
      <p>Name: {{ name }}</p>
      <!-- Add more profile fields as needed -->
    </div>
  `,
  styles: [`
    .profile-container { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #eee; border-radius: 8px; background: #fff; }
    h2 { margin-bottom: 1rem; }
  `]
})
export class ProfileComponent {
  email = localStorage.getItem('userEmail') || 'demo@example.com';
  name = localStorage.getItem('userName') || 'Demo User';
}
