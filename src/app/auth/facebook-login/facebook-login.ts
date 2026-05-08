import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook-login',
  standalone: true,
  template: '',
  styleUrls: ['./facebook-login.scss']
})
export class FacebookLogin implements OnInit {
  ngOnInit(): void {
    window.location.href = 'https://www.facebook.com/login.php';
  }
}
