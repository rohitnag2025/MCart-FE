import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CompareService {
  private compareList: any[] = [];

  getCompareList() {
    return this.compareList;
  }

  addToCompare(product: any) {
    if (!this.compareList.find(item => item.productId === product.productId)) {
      this.compareList.push(product);
    }
  }

  removeFromCompare(productId: string) {
    this.compareList = this.compareList.filter(item => item.productId !== productId);
  }

  clearCompare() {
    this.compareList = [];
  }
}
