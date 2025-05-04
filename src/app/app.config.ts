import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { environment } from '../environments/environment';
import { pathInterceptor } from '../main/interceptors/path-interceptors';
import { API_URL } from '../main/data-access/base-api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([pathInterceptor])),

    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
  ],
};
