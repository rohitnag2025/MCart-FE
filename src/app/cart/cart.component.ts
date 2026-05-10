

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];


  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId') || '00000000-0000-0000-0000-000000000000';
    this.cartService.getCartByUserId(userId).subscribe((cart: any) => {
      const items = cart.items || [];
      const grouped: { [productId: string]: any } = {};
      for (const item of items) {
        if (!item.productId) continue;
        if (!grouped[item.productId]) {
          grouped[item.productId] = { ...item };
        } else {
          grouped[item.productId].quantity = (grouped[item.productId].quantity || 1) + (item.quantity || 1);
          grouped[item.productId].price = (grouped[item.productId].price || 0) + (item.price || 0);
        }
      }
      this.cartItems = Object.values(grouped);
    });
  }

  onProductClick(item: any) {
    if (item.productId) {
      this.router.navigate(['/products', item.productId]);
    }
  }

  get total() {
    // Always use unit price for total calculation
    return this.cartItems.reduce((sum, item) => {
      const unitPrice = item.unitPrice || item.pricePerUnit || (item.originalPrice ?? item.price / item.quantity) || item.price;
      return sum + unitPrice * (item.quantity || 1);
    }, 0);
  }

  increase(item: any) {
    // Always use the original unit price for add
    const unitPrice = item.unitPrice || item.pricePerUnit || (item.originalPrice ?? item.price / item.quantity) || item.price;
    const addPayload = { ...item, price: unitPrice };
    this.cartService.addToCart(addPayload).subscribe({
      next: () => this.refreshCart(),
      error: () => {/* Optionally show error */}
    });
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      // Call remove endpoint to decrease quantity by 1
      this.cartService.removeFromCart(item.productId).subscribe({
        next: () => this.refreshCart(),
        error: () => {/* Optionally show error */}
      });
    }
  }

  remove(item: any) {
    // Remove all of this item from the cart in the DB using the new endpoint
    this.cartService.removeFromCart(item.productId).subscribe({
      next: () => this.refreshCart(),
      error: () => {/* Optionally show error */}
    });
  }

  refreshCart() {
    const userId = localStorage.getItem('userId') || '00000000-0000-0000-0000-000000000000';
    this.cartService.getCartByUserId(userId).subscribe((cart: any) => {
      const items = cart.items || [];
      const grouped: { [productId: string]: any } = {};
      for (const item of items) {
        if (!item.productId) continue;
        if (!grouped[item.productId]) {
          grouped[item.productId] = { ...item };
        } else {
          grouped[item.productId].quantity = (grouped[item.productId].quantity || 1) + (item.quantity || 1);
          grouped[item.productId].price = (grouped[item.productId].price || 0) + (item.price || 0);
        }
      }
      this.cartItems = Object.values(grouped);
    });
  }

  confirmOrder() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Optionally, store redirect URL to return after login
      localStorage.setItem('postLoginRedirectUrl', '/cart/shipping');
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/cart/shipping']);
    }
  }
}
