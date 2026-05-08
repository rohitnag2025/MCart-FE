import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryNode } from './category.service';
import { CategoryMenuComponent } from './category-menu.component';
import { ProductCardComponent } from './product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CategoryMenuComponent, ProductCardComponent],
  template: `
    <div class="products-page">
      <h1>Categories</h1>
      <app-category-menu [categories]="categories" (categorySelected)="onCategorySelected($event)"></app-category-menu>
      <div *ngIf="products && products.length" class="products-grid">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
      <div *ngIf="products && !products.length">No products found for this category.</div>
    </div>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: CategoryNode[] = [];
  products: any[] = [];

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
    console.log('onCategorySelected called with CategoryId:', categoryId);
    this.categoryService.getProductsByCategory(categoryId).subscribe((res: any) => {
      this.products = Array.isArray(res) ? res : [];
    });
  }
}
