


import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from './products/category-menu.component';
import { CategoryService, CategoryNode } from './products/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoryMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'mcart-frontend';
  categories: CategoryNode[] = [];

  get isLoggedIn() {
    return !!localStorage.getItem('userEmail');
  }

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onGlobalCategorySelected(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }

  onLogout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
  }
}
