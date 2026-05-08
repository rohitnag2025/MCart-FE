import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryNode } from '../products/category.service';
import { CategoryMenuComponent } from '../products/category-menu.component';
import { GenderMenuPipe } from '../products/gender-menu.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryMenuComponent, GenderMenuPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: CategoryNode[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
