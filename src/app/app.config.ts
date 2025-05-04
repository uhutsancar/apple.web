import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { API_URL } from './data-access/base-api';
import { environment } from '../environments/environment';
import { pathInterceptor } from './interceptors/path-interceptors';

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
