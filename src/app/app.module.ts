import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductMenuComponent } from './products/product-menu.component';

@NgModule({
  declarations: [AppComponent, ProductMenuComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
