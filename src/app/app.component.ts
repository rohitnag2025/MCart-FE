

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductMenuComponent } from './products/product-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mcart-frontend';

  get isLoggedIn() {
    return !!localStorage.getItem('userEmail');
  }

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
  }
}
