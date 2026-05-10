import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryNode } from '../products/category.service';
import { Router } from '@angular/router';
import { CategoryMenuComponent } from '../products/category-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: CategoryNode[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onGlobalCategorySelected(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
