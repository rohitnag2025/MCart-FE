

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: any[] = [];
  private apiUrl = 'http://localhost:5003/api/Orders/cart'; // Change to your order service base URL

  constructor(private http: HttpClient) {}

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const userId = localStorage.getItem('userId');
    // If product.price is an array or sum, always use the unit price (if available)
    const unitPrice = product.unitPrice || product.pricePerUnit || product.price;
    const payload = {
      cartItemId: product.cartItemId || undefined,
      cartId: product.cartId || undefined,
      productId: product.productId,
      productName: product.name,
      quantity: 1,
      price: unitPrice,
      discount: product.discount || 0,
      userId: userId ? userId : null
    };
    return this.http.post(`${this.apiUrl}/add`, payload);
  }

  removeFromCart(productId: string) {
    const userId = localStorage.getItem('userId');
    const payload = {
      userId: userId ? userId : null,
      productId
    };
    return this.http.post('http://localhost:5003/api/Orders/cart/remove', payload);
  }

  removeOneFromCart(product: any) {
    const userId = localStorage.getItem('userId');
    const payload = {
      productId: product.productId,
      userId: userId ? userId : null
    };
    return this.http.post(`${this.apiUrl}/removeOne`, payload);
  }

  clearCart() {
    this.cart = [];
  }
}
