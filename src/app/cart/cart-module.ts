import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { ShippingComponent } from './shipping.component';
import { PaymentComponent } from './payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { OrderSuccessComponent } from './order-success.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxStripeModule.forRoot(environment.stripePublishableKey),
    RouterModule.forChild([
      { path: '', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'success', component: OrderSuccessComponent }
    ]),
    CartComponent,
    ShippingComponent,
    PaymentComponent,
    OrderSuccessComponent
  ]
})
export class CartModule { }
