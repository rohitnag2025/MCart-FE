
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface CategoryNode {
  CategoryId: number;
  Name: string;
  Gender?: string;
  Children?: CategoryNode[];
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryNode[]> {
    return this.http.get<any[]>('http://localhost:5002/api/Categories').pipe(
      map(categories => categories.map(cat => this.mapCategory(cat)))
    );
  }

  private mapCategory(cat: any): CategoryNode {
    // Debug log to verify backend structure at every level
    console.log('Mapping category:', cat);
    return {
      CategoryId: cat.categoryId ?? cat.CategoryId,
      Name: cat.name ?? cat.Name,
      Gender: cat.gender ?? cat.Gender,
      Children: Array.isArray(cat.subcategories ?? cat.Children)
        ? (cat.subcategories ?? cat.Children).map((c: any) => this.mapCategory(c))
        : []
    };
  }
  
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`http://localhost:5002/api/Products/category/${categoryId}`);
  }
}
