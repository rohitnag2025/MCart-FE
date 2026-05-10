import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStripeModule, StripeCardComponent, StripeService } from 'ngx-stripe';
import { Router } from '@angular/router';
import type { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, NgxStripeModule, StripeCardComponent, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };
  name = '';
  loading = false;
  error = '';
  success = '';

  constructor(private stripeService: StripeService, private router: Router) {}

  pay() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.stripeService
      .createToken(this.card.element, { name: this.name })
      .subscribe((result) => {
        this.loading = false;
        if (result.token) {
          // In a real app, send token to backend for payment processing
          this.router.navigate(['/cart/success']);
        } else if (result.error) {
          this.error = result.error.message || 'Payment failed.';
        }
      });
  }
}
