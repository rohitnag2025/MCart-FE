import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-product-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav *ngIf="products.length">
      <ul>
        <li *ngFor="let product of products">
          <img *ngIf="product.imageUrl" [src]="product.imageUrl" alt="{{product.name}}" width="40" height="40" />
          <span>{{ product.name }}</span>
        </li>
      </ul>
    </nav>
    <div *ngIf="!products.length">No products found.</div>
  `,
  styles: [`nav ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; } nav li { margin: 0 10px; display: flex; align-items: center; } img { margin-right: 8px; border-radius: 4px; }`]
})
export class ProductMenuComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.products;
    });
  }
}
