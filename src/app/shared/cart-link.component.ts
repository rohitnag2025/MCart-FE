import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a href="#" class="cart-link" (click)="goToCart($event)">
      Cart<span *ngIf="cartCount > 0">({{ cartCount }})</span>
    </a>
  `,
  styles: [`
    .cart-link {
      color: #1976d2;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
    }
    .cart-link:hover {
      color: #1565c0;
      text-decoration: underline;
    }
  `]
})
export class CartLinkComponent {
  @Input() cartCount = 0;
  @Input() goToCart!: (event: Event) => void;
}
