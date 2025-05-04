import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { API_URL } from '../data-access/base-api';
import { inject } from '@angular/core';

export const pathInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiUrl = inject(API_URL);
  req = req.clone({
    url: `${apiUrl}/${req.url}`,
  });
  return next(req);
};
