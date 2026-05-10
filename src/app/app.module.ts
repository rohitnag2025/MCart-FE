import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductMenuComponent } from './products/product-menu.component';

@NgModule({
  declarations: [AppComponent, ProductMenuComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
