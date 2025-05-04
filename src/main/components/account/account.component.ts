import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { AuthApi } from '../../data-access/auth-api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent  {

  authApi = inject(AuthApi);
  authService = inject(AuthService);






}
