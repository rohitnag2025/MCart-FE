import { Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from './products/category-menu.component';
import { Login } from './auth/login/login';
import { CartLinkComponent } from './shared/cart-link.component';
import { CategoryService, CategoryNode } from './products/category.service';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoryMenuComponent, Login, CartLinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'mcart-frontend';
  categories: CategoryNode[] = [];
  cartService = inject(CartService);
  router = inject(Router);
  categoryService = inject(CategoryService);

  showLoginModal = false;
    showCartMenu = false;

  get isLoggedIn() {
    return !!localStorage.getItem('userEmail');
  }

  get cartCount() {
    return this.cartService.getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  goToCart() {
    const cart = this.cartService.getCart();
    if (cart && cart.length > 0) {
      this.router.navigate(['/cart/shipping']);
    } else {
      this.router.navigate(['/cart']);
    }
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onGlobalCategorySelected(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  openLoginModal() {
    this.showLoginModal = true;
  }

  loginSuccessMessage = '';
  closeLoginModal() {
    console.log('[AppComponent] closeLoginModal called');
    this.showLoginModal = false;
    this.loginSuccessMessage = 'Login successful!';
    setTimeout(() => this.loginSuccessMessage = '', 3000);
  }
}
