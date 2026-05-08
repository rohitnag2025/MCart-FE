import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { CategoryNode } from './category.service';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav *ngIf="categories.length">
      <ul class="menu-root">
        <ng-container *ngFor="let cat of categories">
          <li>
            <span class="menu-link" (click)="onCategoryClick(cat, $event)">{{ cat.Name }}</span>
            <ul *ngIf="cat.Children && cat.Children.length">
              <ng-container *ngFor="let child of cat.Children">
                <li>
                  <span class="menu-link" (click)="onCategoryClick(child, $event)">{{ child.Name }}</span>
                  <ul *ngIf="child.Children && child.Children.length">
                    <ng-container *ngFor="let grand of child.Children">
                      <li>
                        <span class="menu-link" (click)="onCategoryClick(grand, $event)">{{ grand.Name }}</span>
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
    nav > ul.menu-root {
      display: flex;
      flex-wrap: wrap;
      gap: 1.1rem;
      justify-content: center;
      align-items: center;
      width: 100%;
      background: linear-gradient(90deg, #ffb347 0%, #ff5e62 100%);
      border-radius: 0;
      box-shadow: 0 4px 16px rgba(255,94,98,0.10), 0 1.5px 8px rgba(255,179,71,0.08);
      padding: 0.5rem 0;
      margin-bottom: 0.7rem;
      min-height: 38px;
      max-width: 100vw;
      backdrop-filter: blur(4px);
      border: none;
      animation: fadeInMenu 0.7s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes fadeInMenu {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    nav > ul.menu-root > li {
      margin: 0 10px;
      position: relative;
      min-width: 90px;
      border-radius: 999px;
      overflow: visible;
      background: #fff;
      box-shadow: 0 2px 8px rgba(25,118,210,0.06);
      border: none;
      transition: box-shadow 0.18s, transform 0.14s;
      will-change: transform;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
    }
    nav > ul.menu-root > li:hover {
      box-shadow: 0 8px 32px rgba(25,118,210,0.18);
      border-color: #1976d2;
      transform: translateY(-4px) scale(1.04);
    }
    nav ul ul {
      display: none;
      position: absolute;
      background: rgba(255,255,255,0.97);
      border: 1.5px solid #e3f0ff;
      min-width: 180px;
      z-index: 20;
      padding: 10px 0;
      top: 0;
      left: 100%;
      box-shadow: 0 8px 32px rgba(25,118,210,0.13);
      border-radius: 0 14px 14px 14px;
      animation: fadeInDrawer 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes fadeInDrawer {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    nav > ul.menu-root > li > ul {
      top: 100%;
      left: 0;
      position: absolute;
      border-radius: 0 0 14px 14px;
    }
    nav ul ul li {
      margin: 0;
      padding: 5px 16px;
      white-space: nowrap;
      position: relative;
      background: transparent;
      border-bottom: 1px solid #ffe0b2;
      transition: background 0.18s, color 0.18s;
      font-size: 0.97rem;
    }
    nav ul ul li:last-child { border-bottom: none; }
    nav li:hover > ul { display: block; }
    nav li:hover > span, nav ul ul li:hover > span {
      background: linear-gradient(90deg, #42a5f5 0%, #1976d2 100%);
      color: #fff;
      box-shadow: 0 2px 8px rgba(25,118,210,0.10);
      text-shadow: 0 1px 4px rgba(25,118,210,0.10);
      transform: scale(1.04);
    }
    span {
      font-weight: 600;
      display: block;
      padding: 0 22px;
      border-radius: 999px;
      transition: background 0.16s, color 0.16s, transform 0.14s;
      font-family: 'Montserrat', sans-serif;
      letter-spacing: 0.3px;
      background: transparent;
      color: #ff5e62;
      font-size: 1rem;
      cursor: pointer;
      line-height: 36px;
    }
    .menu-link, .menu-link:hover { cursor: pointer; }
    nav ul ul ul { left: 100%; top: 0; }
  `]
})
export class CategoryMenuComponent {
  @Input() categories: CategoryNode[] = [];
  @Output() categorySelected = new EventEmitter<number>();

  onCategoryClick(category: any, event?: MouseEvent) {
    // if (event) {
    //   event.stopPropagation();
    // }
    if (category && category.CategoryId) {
      this.categorySelected.emit(category.CategoryId);
    }
  }
}
