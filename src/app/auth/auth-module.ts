import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { SocialCallback } from './social-callback/social-callback';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { EmailConfirmation } from './email-confirmation/email-confirmation';
import { ResetPassword } from './reset-password/reset-password';
import { FacebookLogin } from './facebook-login/facebook-login';
import { TwitterLogin } from './twitter-login/twitter-login';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Login,
    SocialCallback,
    Register,
    ForgotPassword,
    EmailConfirmation,
    ResetPassword,
    FacebookLogin,
    TwitterLogin,
    RouterModule.forChild([
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'social-callback', component: SocialCallback },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'email-confirmation', component: EmailConfirmation },
      { path: 'reset-password', component: ResetPassword },
      { path: 'facebook-login', component: FacebookLogin },
      { path: 'twitter-login', component: TwitterLogin }
    ])
  ]
})
export class AuthModule { }
