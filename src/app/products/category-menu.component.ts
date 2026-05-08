import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, CategoryNode } from './category.service';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav *ngIf="categories.length">
      <ul class="menu-root">
        <ng-container *ngFor="let cat of categories">
          <li>
            <span>{{ cat.Name }}</span>
            <ul *ngIf="cat.Children && cat.Children.length">
              <ng-container *ngFor="let child of cat.Children">
                <li>
                  <span>{{ child.Name }}</span>
                  <ul *ngIf="child.Children && child.Children.length">
                    <ng-container *ngFor="let grand of child.Children">
                      <li>
                        <span>{{ grand.Name }}</span>
                        <!-- Add more levels recursively if needed -->
                      </li>
                    </ng-container>
                  </ul>
                </li>
              </ng-container>
            </ul>
          </li>
        </ng-container>
      </ul>
    </nav>
    <div *ngIf="!categories.length">No categories found.</div>
  `,
  styles: [`
    nav ul { list-style: none; padding: 0; margin: 0; }
    nav > ul.menu-root { display: flex; flex-wrap: wrap; }
    nav > ul.menu-root > li { margin: 0 20px; position: relative; }
    nav ul ul {
      display: none;
      position: absolute;
      background: #fff;
      border: 1px solid #eee;
      min-width: 180px;
      z-index: 10;
      padding: 8px 0;
      top: 0;
      left: 100%;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    nav > ul.menu-root > li > ul {
      top: 100%;
      left: 0;
      position: absolute;
    }
    nav ul ul li { margin: 0; padding: 4px 16px; white-space: nowrap; position: relative; }
    nav li:hover > ul { display: block; }
    nav li:hover > span { background: #e3f0ff; color: #1976d2; }
    span { cursor: pointer; font-weight: 500; display: block; padding: 6px 12px; border-radius: 4px; transition: background 0.2s; }
    span:hover { cursor: pointer; }
    nav ul ul ul { left: 100%; top: 0; }
  `]
})
export class CategoryMenuComponent {
  @Input() categories: CategoryNode[] = [];
}
