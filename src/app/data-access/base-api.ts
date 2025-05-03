import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export class BaseApi {
  baseUrl = inject(API_URL);
  http = inject(HttpClient);
}
