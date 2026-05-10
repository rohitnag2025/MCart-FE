import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: any[] = [];

  getWishlist() {
    return this.wishlist;
  }

  addToWishlist(product: any) {
    if (!this.wishlist.find(item => item.productId === product.productId)) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(productId: string) {
    this.wishlist = this.wishlist.filter(item => item.productId !== productId);
  }
}
