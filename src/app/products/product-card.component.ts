import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    </div>
  `,
  styles: [`
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

  getImageUrl(blobName: string): string {
    if (!blobName || blobName.trim() === '') {
      return 'https://via.placeholder.com/200x160?text=No+Image';
    }
    return `http://localhost:5002/images/${blobName}`;
  }
}
