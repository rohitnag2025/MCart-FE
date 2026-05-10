import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryNode } from './category.service';
import { CategoryMenuComponent } from './category-menu.component';
import { ProductCardComponent } from './product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CategoryMenuComponent, ProductCardComponent],
  template: `
    <div class="products-page">
      <app-category-menu [categories]="categories" (categorySelected)="onCategorySelected($event)"></app-category-menu>
      <h1 *ngIf="selectedCategoryName" class="category-title">{{ selectedCategoryName }}</h1>
      <div *ngIf="products && products.length" class="products-grid">
        <app-product-card *ngFor="let product of products" [product]="product" (quickView)="onQuickView($event)"></app-product-card>
      </div>
      <div *ngIf="products && !products.length">No products found for this category.</div>

      <!-- Quick View Modal -->
      <div class="modal-backdrop" *ngIf="quickViewProduct" (click)="closeQuickView()"></div>
      <div class="quick-view-modal" *ngIf="quickViewProduct">
        <div class="modal-content">
          <button class="close-btn" (click)="closeQuickView()">&times;</button>
          <img [src]="quickViewProduct.imageUrl || quickViewProduct.imageBlobName ? (apiBase + '/images/' + (quickViewProduct.imageUrl || quickViewProduct.imageBlobName)) : 'https://via.placeholder.com/200x160?text=No+Image'" alt="{{ quickViewProduct.name }}" style="width: 220px; height: 160px; object-fit: contain; margin-bottom: 1rem;" />
            apiBase = environment.apiUrl.replace(/\/api$/, '');
          <h2>{{ quickViewProduct.name }}</h2>
          <div><b>Price:</b> ₹{{ quickViewProduct.price | number:'1.2-2' }}</div>
          <div><b>Description:</b> {{ quickViewProduct.description }}</div>
          <div><b>Stock:</b> {{ quickViewProduct.stock }}</div>
          <div><b>Tags:</b> {{ quickViewProduct.tags }}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: CategoryNode[] = [];
  products: any[] = [];
  apiBase = environment.apiUrl.replace(/\/api$/, '');
  selectedCategoryName: string = '';
  quickViewProduct: any = null;
  onQuickView(product: any) {
    this.quickViewProduct = product;
  }

  closeQuickView() {
    this.quickViewProduct = null;
  }

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.route.queryParams.subscribe(params => {
      const categoryId = +params['categoryId'];
      if (categoryId) {
        this.onCategorySelected(categoryId);
      }
    });
  }

  onCategorySelected(categoryId: number) {
    this.categoryService.getProductsByCategory(categoryId).subscribe((res: any) => {
      this.products = Array.isArray(res) ? res : [];
    });
    this.categoryService.getCategories().subscribe(categories => {
      const name = this.findCategoryName(categories, categoryId);
      this.selectedCategoryName = name ? name : 'Products';
    });
  }

  findCategoryName(categories: CategoryNode[], categoryId: number): string | null {
    for (const cat of categories) {
      if (cat.CategoryId === categoryId) return cat.Name;
      if (cat.Children && cat.Children.length) {
        const found = this.findCategoryName(cat.Children, categoryId);
        if (found) return found;
      }
    }
    return null;
  }
}
