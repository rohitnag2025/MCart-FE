import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productId: string;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  discount: number;
  stock: number;
  imageUrl?: string;
  tags: string;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ total: number; products: Product[] }> {
    return this.http.get<{ total: number; products: Product[] }>(this.apiUrl);
  }

  getProductsByCategory(categoryId: number): Observable<{ total: number; products: Product[] }> {
    return this.http.get<{ total: number; products: Product[] }>(`${this.apiUrl}?categoryId=${categoryId}`);
  }
}
