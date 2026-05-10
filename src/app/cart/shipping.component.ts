import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  shipping = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  };

  constructor(private router: Router) {}

  submit() {
    // In a real app, validate and save shipping info
    this.router.navigate(['/cart/payment'], { state: { shipping: this.shipping } });
  }
}
