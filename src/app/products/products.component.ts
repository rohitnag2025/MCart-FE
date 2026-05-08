import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryNode } from './category.service';
import { CategoryMenuComponent } from './category-menu.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CategoryMenuComponent],
  template: `
    <div class="products-page">
      <h1>Categories</h1>
      <app-category-menu [categories]="categories"></app-category-menu>
    </div>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: CategoryNode[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
