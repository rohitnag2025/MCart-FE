import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { WishlistService } from '../shared/wishlist.service';
import { CompareService } from '../shared/compare.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <img [src]="getImageUrl(product.imageBlobName)" alt="{{ product.name }}" />
      <div class="product-info">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">₹{{ product.price | number:'1.2-2' }}</div>
      </div>
      <div class="product-actions">
        <button class="btn-cart" (click)="$event.stopPropagation(); onAddToCart()">Add to Cart</button>
        <button class="btn-quick" (click)="$event.stopPropagation(); onQuickView()">Quick View</button>
        <button class="btn-compare" (click)="$event.stopPropagation(); onCompare()">Compare</button>
        <button class="btn-wishlist" (click)="$event.stopPropagation(); onAddToWishList()">Wish List</button>
      </div>
    </div>
  `,
  styles: [`
        .product-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 0.7rem;
        }
        .product-actions button {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 0.4rem 1.1rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .product-actions button:hover {
          background: #1565c0;
          color: #ffeb3b;
        }
    .product-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(25,118,210,0.08);
      overflow: hidden;
      transition: box-shadow 0.2s, transform 0.18s;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      cursor: pointer;
      min-width: 180px;
      max-width: 220px;
      margin: 0.5rem;
    }
    .product-card:hover {
      box-shadow: 0 8px 32px rgba(25,118,210,0.13);
      transform: translateY(-4px) scale(1.04);
    }
    .product-card img {
      width: 100%;
      height: 160px;
      object-fit: contain;
      margin-bottom: 0.7rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .product-info {
      width: 100%;
      text-align: center;
    }
    .product-name {
      font-size: 1.05rem;
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: #222;
    }
    .product-price {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ff5e62;
    }
  `]
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() quickView = new EventEmitter<any>();

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private compareService = inject(CompareService);

  getImageUrl(blobName: string): string {
    if (!blobName || blobName.trim() === '') {
      return 'https://via.placeholder.com/200x160?text=No+Image';
    }
    return `${environment.apiUrl.replace(/\/api$/, '')}/images/${blobName}`;
  }

  onAddToCart() {
    const userId = localStorage.getItem('userId');
    const productWithUser = { ...this.product, userId };
    this.cartService.addToCart(productWithUser).subscribe({
      next: () => {
        // Refresh cart count after adding
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.cartService.getCartByUserId(userId).subscribe();
        }
        // Optionally show a toast/snackbar here
      },
      error: () => {
        // Optionally show an error toast/snackbar here
      }
    });
  }

  onQuickView() {
    this.quickView.emit(this.product);
  }

  onCompare() {
    this.compareService.addToCompare(this.product);
    // Optionally show a toast/snackbar here
  }

  onAddToWishList() {
    this.wishlistService.addToWishlist(this.product);
    // Optionally show a toast/snackbar here
  }
}
