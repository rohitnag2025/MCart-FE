import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-success-page">
      <h2>Thank you for your order!</h2>
      <p>Your payment was successful and your order has been placed.</p>
      <button (click)="goHome()">Back to Home</button>
    </div>
  `,
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/']);
  }
}
