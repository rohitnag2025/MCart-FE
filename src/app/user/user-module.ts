import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileComponent,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent }
    ])
  ]
})
export class UserModule { }
