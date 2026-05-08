import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitter-login',
  standalone: true,
  template: '',
  styleUrls: ['./twitter-login.scss']
})
export class TwitterLogin implements OnInit {
  ngOnInit(): void {
    window.location.href = 'https://twitter.com/i/flow/login';
  }
}
