import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../../../app/data-access/auth-api';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {

  username = model<string>('emilys');
  password = model<string>('emilyspass');
  authApi = inject(AuthApi);
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private _seoService: SeoService)  {}

  ngOnInit() {
    this._seoService.updateSeoTags({
      title: 'Sign in ',
      description: 'Apple Sign in',
      image: '',
      pageLink: ''
    })
  }

  submit() {
    this.authApi.login(this.username(), this.password()).subscribe({
      next: (user) => {
     this.authService.setUser(user);
     this.router.navigate(['/account']);
      },
    });
  }
}
