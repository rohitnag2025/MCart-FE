
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
    return {
      CategoryId: cat.categoryId,
      Name: cat.name,
      Gender: cat.gender,
      Children: Array.isArray(cat.subcategories) ? cat.subcategories.map((c: any) => this.mapCategory(c)) : []
    };
  }
}
