import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from './models/base-api.types';

export class BaseApi {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends BaseApi {
  login(username: string, password: string) {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  }
}
