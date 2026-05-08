import { Pipe, PipeTransform } from '@angular/core';
import { CategoryNode } from './category.service';

@Pipe({
  name: 'genderMenu',
  standalone: true
})
export class GenderMenuPipe implements PipeTransform {
  transform(categories: CategoryNode[], genders: string): CategoryNode[] {
    if (!categories || !genders) return [];
    const genderList = genders.split(',').map(g => g.trim().toLowerCase());
    return categories.filter(cat => genderList.includes(cat.Name.toLowerCase()));
  }
}
